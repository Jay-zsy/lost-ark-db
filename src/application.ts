import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { client } from './db';
import { engravingsRoutes } from './routes/engraving';

const app = express();

function readFile(path: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

export function application(ENV: string) {
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  app.use("/api/", engravingsRoutes(client));

  if (ENV === "development" || ENV === "test") {
    Promise.all([
      readFile(path.resolve(__dirname, `db/schema/create.sql`)),
      readFile(path.resolve(__dirname, `db/schema/${ENV}.sql`))
    ])
      .then(([create, seed]) => {
        app.get("/api/debug/reset", (request, response) => {
          client.query(String(create))
            .then(() => client.query(String(seed)))
            .then(() => {
              console.log("Database Reset");
              response.status(200).send("Database Reset");
            });
        });
      })
      .catch(error => {
        console.log(`Error setting up the reset route: ${error}`);
      });
  }

  return app;
}