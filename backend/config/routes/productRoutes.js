import express from "express";
import {
    createProduct, deleteProduct, getBoostedProducts,
    getProducts,
    getProductsByCategory,
    getProductsByUser,
    updateProduct,
    getProductsByEmail
} from "../controllers/productController.js";

const router = express.Router();

router.route('/').get(getProducts).post(createProduct).put(updateProduct);
router.route('/:id').delete(deleteProduct);
router.route('/:category').get(getProductsByCategory);
router.route('/boosted').get(getBoostedProducts);
router.route('/vendeur/:idVendeur').get(getProductsByUser);
router.route('/email/:emailVendeur').get(getProductsByEmail);

export default router;
