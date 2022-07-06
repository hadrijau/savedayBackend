import express from "express";
import { createToken, getTokens } from "../controllers/tokenController.js";

const router = express.Router();

router.route('/').get(getTokens).post(createToken)

export default router;
