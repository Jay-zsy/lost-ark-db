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
    ).then(result => res.json(result));
  });
  router.get("/engravings/class", (req, res) => {
    client.query(
      `
      SELECT * FROM engravings
      WHERE type = 'CLASS'
      `
    ).then(result => res.json(result));
  });
  router.get("/engravings/common", (req, res) => {
    client.query(
      `
      SELECT * FROM engravings
      WHERE type = 'COMMON'
      `
    ).then(result => res.json(result));
  });

  return router;
};
