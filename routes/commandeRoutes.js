import express from "express";
import {
    createCommande,
    getCommandes,
    getCommandesBySeller,
    deleteCommande
} from "../controllers/commandeController.js";

const router = express.Router();

router.route('/').get(getCommandes).post(createCommande);
router.route('/:acheteur').get(getCommandesBySeller);
router.route('/:id').delete(deleteCommande);


export default router;
