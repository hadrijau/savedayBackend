import express from "express";
import { createTemoin, getTemoins } from "../controllers/temoinController.js"

const router = express.Router();

router.route('/').post(createTemoin).get(getTemoins)

export default router;
