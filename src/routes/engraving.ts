import { Router } from "express";
import { Client } from "pg";

const router = Router();

export const engravingsRoutes = (client: Client) => {
  router.get("/engravings/malice", (req, res) => {
    client.query(
      `
      SELECT * FROM engravings
      WHERE type = 'MALICE'
      `
    ).then(({ rows }) => res.json(rows));
  });
  router.get("/engravings/class", (req, res) => {
    client.query(
      `
      SELECT * FROM engravings
      WHERE type = 'CLASS'
      `
    ).then(({ rows }) => res.json(rows));
  });
  router.get("/engravings/common", (req, res) => {
    client.query(
      `
      SELECT * FROM engravings
      WHERE type = 'COMMON'
      `
    ).then(({ rows }) => res.json(rows));
  });

  return router;
};
