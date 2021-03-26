import express from "express";
import AuthController from "./auth.controller.js";

const router = express.Router();
const controller = new AuthController();

router.post("/signup", controller.signup);
router.post("/login", controller.login);

export default router;
