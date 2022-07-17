import asyncHandler from "express-async-handler";
import Sos from "../models/sosModel.js";


// @desc Get all sos
// @route GET /api/sos
// @access Public
const getSos = asyncHandler(async (req, res) => {
    const sos = await Sos.find({});
    console.log(sos)
    res.json(sos);
});

// @desc Create a commerce
// @route POST /api/sos
// @access Public
const createSos = asyncHandler(async (req, res) => {

    const {latlng} = req.body;

    console.log(latlng)
    const sos = await Sos.create({latlng});

    if (sos) {
        res.status(201).json({
            position: sos.latlng
        })
    } else {
        res.status(400)
        throw new Error("Pas de sos crée")
    }
});

export { createSos, getSos }
