import express from "express";
import {createActualite, getActualites, getActualitesByCommerceId, updateActualite, deleteActualite} from "../controllers/actualiteController.js";

const router = express.Router();

router.route('/').get(getActualites).post(createActualite).put(updateActualite);
router.route('/:id').get(getActualitesByCommerceId).delete(deleteActualite);

export default router;
