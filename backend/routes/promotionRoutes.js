import express from "express";
import {createPromotion, getPromotions, getPromotionsByCommerceId, deletePromotion, updatePromotion, getPromotionById} from "../controllers/promotionController.js";

const router = express.Router();

router.route('/').get(getPromotions).post(createPromotion).put(updatePromotion);
router.route('/:id').get(getPromotionsByCommerceId).delete(deletePromotion);
router.route('/promotion/:id').get(getPromotionById);
export default router;
