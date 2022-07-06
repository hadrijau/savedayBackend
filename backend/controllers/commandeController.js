import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Commande from "../models/commandeModel.js";
import mongoose from "mongoose";


// @desc Get all commandes
// @route GET /api/commandes
// @access Public
const getCommandes = asyncHandler(async (req, res) => {
    const commandes = await Commande.find({});
    res.json(commandes);
});

// @desc Get commande by acheteur
// @route GET /api/commandes/:acheteur
// @access Public
const getCommandesBySeller = asyncHandler(async (req, res) => {
    const {acheteur} = req.params
    const commandes = await Commande.find({acheteur});
    res.json(commandes);
});

// @desc Create a commande
// @route POST /api/commandes
// @access Public
const createCommande = asyncHandler(async (req, res) => {
    const {
        title,
        categorie,
        description,
        prix,
        image,
        vendeur,
        livraison,
        moyenPaiement,
        poids,
        acheteur,
        prixProtectionAcheteur,
        total,
        pseudoVendeur,
        emailVendeur
    } = req.body;

    const commande = await Commande.create({
        title,
        categorie,
        description,
        prix,
        image,
        vendeur,
        livraison,
        moyenPaiement,
        poids,
        prixProtectionAcheteur,
        total,
        acheteur,
        pseudoVendeur,
        emailVendeur
    });

    if (commande) {
        res.status(201).json({commande})
    } else {
        res.status(400)
        throw new Error("Pas de commande crée")
    }
});

// @desc Delete commande
// @route DELETE /api/commandes/:id
// @access Private/admin
const deleteCommande = asyncHandler(async (req, res) => {
    const commande = await Commande.findById(req.params.id);
    if (commande) {
        await commande.remove();
        res.json({ message: "Commande removed" })
    } else {
        res.status(404)
        throw new Error("Commande not found")
    }
});



export { getCommandesBySeller, getCommandes, createCommande, deleteCommande }
