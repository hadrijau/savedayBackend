import asyncHandler from "express-async-handler";
import Temoin from "../models/temoinModel.js";

// @desc Get all sos
// @route GET /api/temoin
// @access Public
const getTemoins = asyncHandler(async (req, res) => {
    const temoins = await Temoin.find({});
    console.log(temoins)
    res.json(temoins);
});

// @desc Create a commerce
// @route POST /api/temoin
// @access Public
const createTemoin = asyncHandler(async (req, res) => {

    const {latlng} = req.body;

    console.log(latlng)
    const temoin = await Temoin.create({latlng});

    if (temoin) {
        res.status(201).json({
            position: temoin.latlng
        })
    } else {
        res.status(400)
        throw new Error("Pas de sos crée")
    }
});

export { getTemoins, createTemoin }
