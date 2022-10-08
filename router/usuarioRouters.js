import express from "express";
import { forgotPassword, login, register, confirmar, comprobarToken, nuevoPassword } from "../controllers/usuarioControllers.js";

const router = express.Router();

router.get("/login", login);

router.post("/register", register);
router.get("/confirmar/:token", confirmar);


router.post("/forgotPassword", forgotPassword);
router.get("/forgotPassword/:token", comprobarToken);


export default router;
