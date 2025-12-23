import express from "express";
import authController from "../controllers/controller.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/home/:id", userController.home);

export default router;
