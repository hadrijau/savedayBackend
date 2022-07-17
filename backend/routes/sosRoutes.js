import express from "express";
import { createSos, getSos } from "../controllers/sosController.js"

const router = express.Router();

router.route('/').post(createSos).get(getSos)

export default router;
