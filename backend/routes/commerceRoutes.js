import express from "express";
import {createCommerce, getCommerces, getCommercesByType, loginCommerce, getCommercesById, updateCommerce, updateNotification} from "../controllers/commerceController.js";

const router = express.Router();

router.route('/').get(getCommerces).post(createCommerce).put(updateCommerce);
router.route('/type').post(getCommercesByType);
router.route('/login').post(loginCommerce);
router.route('/notifications').put(updateNotification);
router.route('/:id').get(getCommercesById);

export default router;
