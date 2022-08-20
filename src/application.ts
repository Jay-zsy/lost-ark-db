import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const app = express();

// function readFile(path: string) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(
//       path,
//       {
//         encoding: "utf-8"
//       },
//       (error, data) => {
//         if (error) return reject(error);
//         resolve(data);
//       }
//     );
//   });
// }

// path.resolve()

export function application() {
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  

  return app;
}