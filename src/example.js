import express from "express";
import { ensureAuthorizationFactory } from "./auth/auth.middleware.js";

const ensureAuthorization = ensureAuthorizationFactory().create();

const exampleRouter = express.Router();
exampleRouter.get("/", ensureAuthorization, (req, res) => {
  res.json({
    success: true,
    data: "THAT'S A LOTTA DATA",
  });
});

export default exampleRouter;
