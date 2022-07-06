import asyncHandler from "express-async-handler";
import Commerce from "../models/commerceModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc Get all commerces
// @route GET /api/commerces
// @access Public
const getCommerces = asyncHandler(async (req, res) => {
    const commerces = await Commerce.find({});
    console.log(commerces)
    res.json(commerces);
});

// @desc Get commerce by type
// @route POST /api/commerces/type
// @access Public
const getCommercesByType = asyncHandler(async (req, res) => {
    const {type} = req.body
    const commerces = await Commerce.find({type: type});
    console.log(commerces)
    res.json(commerces);
});

// @desc Get commerce by id
// @route GET /api/commerces/:id
// @access Public
const getCommercesById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const commerce = await Commerce.findById(id);
    res.json(commerce);
});

// @desc Create a commerce
// @route POST /api/commerces
// @access Public
const createCommerce = asyncHandler(async (req, res) => {

    const {
        name,
        email,
        address,
        latlng,
        image,
        type,
        phone,
        website,
        startTimeMon,
        startTimeTue,
        startTimeWed,
        startTimeThu,
        startTimeFri,
        startTimeSat,
        startTimeSun,
        endTimeMon,
        endTimeTue,
        endTimeWed,
        endTimeThu,
        endTimeFri,
        endTimeSat,
        endTimeSun,
    } = req.body;

    const commerce = await Commerce.create({
        name,
        address,
        latlng,
        image,
        email,
        phone,
        startTimeMon,
        startTimeTue,
        startTimeWed,
        startTimeThu,
        startTimeFri,
        startTimeSat,
        startTimeSun,
        endTimeMon,
        endTimeTue,
        endTimeWed,
        endTimeThu,
        endTimeFri,
        endTimeSat,
        endTimeSun,
        type,
        website
    });

    if (commerce) {
        res.status(201).json({
            email: commerce.email,
            name: commerce.name,
            address: commerce.address,
            latlng: commerce.latlng,
            image: commerce.image,
            startTime: commerce.startTime,
            endTime: commerce.endTime,
            type: commerce.type,
        })
    } else {
        res.status(400)
        throw new Error("Pas de commerce crée")
    }
});

// @desc Register User
// @route POST /api/commerces/login
// @access Public
const loginCommerce = asyncHandler(async (req, res) => {
    const commerce = await Commerce.findOne({email: req.body.email})
    const secret = process.env.JWT_SECRET;
    if(!commerce) {
        return res.status(400).send('The user not found');
    }

    if(commerce && bcrypt.compareSync(req.body.password, commerce.password)) {
        const token = jwt.sign(
            {
                commerceId: commerce.id,
            },
            secret,
            {expiresIn : '365d'}
        )
        res.status(200).send({commerce: commerce.email , token: token})
    } else {
        res.status(400).send('password is wrong!');
    }
});

// @desc Update commerce
// @route PUT /api/commerces
// @access Private
const updateCommerce = asyncHandler(async (req, res) => {
    const commerce = await Commerce.findById(req.body.id)

    const {
        image,
        description,
        name,
        startTimeMon,
        startTimeTue,
        startTimeWed,
        startTimeThu,
        startTimeFri,
        startTimeSat,
        startTimeSun,
        endTimeMon,
        endTimeTue,
        endTimeWed,
        endTimeThu,
        endTimeFri,
        endTimeSat,
        endTimeSun,
        promotionDescription,
        promotionImage,
        promotionTitle,
        phone,
        website,
        email,
        latlng,
        notifications
    } = req.body
    if (commerce) {
        if (image != null) {
            console.log('hdfdhdj')
            commerce.image.push(image)
        }

        const coordinates =   {
            latitude: latlng.lat,
                longitude: latlng.lng
        };

        commerce.startTimeMon = startTimeMon || commerce.startTimeMon
        commerce.startTimeTue = startTimeTue || commerce.startTimeTue
        commerce.startTimeWed = startTimeWed || commerce.startTimeWed
        commerce.startTimeThu = startTimeThu || commerce.startTimeThu
        commerce.startTimeFri = startTimeFri || commerce.startTimeFri
        commerce.startTimeSat = startTimeSat || commerce.startTimeSat
        commerce.startTimeSun = startTimeSun || commerce.startTimeSun
        commerce.endTimeMon = endTimeMon || commerce.endTimeMon
        commerce.endTimeTue = endTimeTue || commerce.endTimeTue
        commerce.endTimeWed = endTimeWed || commerce.endTimeWed
        commerce.endTimeThu = endTimeThu || commerce.endTimeThu
        commerce.endTimeFri = endTimeFri || commerce.endTimeFri
        commerce.endTimeSat = endTimeSat || commerce.endTimeSat
        commerce.endTimeSun = endTimeSun || commerce.endTimeSun
        commerce.website = website || commerce.website
        commerce.phone = phone || commerce.phone
        commerce.notifications = notifications || commerce.notifications
        commerce.email = email || commerce.email
        commerce.name = name || commerce.name
        commerce.latlng = coordinates || commerce.latlng
        if (promotionImage && promotionTitle && promotionDescription) {
            commerce.promotionTitle = promotionTitle
            commerce.promotionImage = promotionImage
            commerce.promotionDescription = promotionDescription
        }
        const updatedCommerce = await commerce.save();
        res.status(200).json({
            _id: commerce._id,
            image: commerce.image
        })
    } else {
        res.status(404)
        throw new Error('Commerce not found')
    }
});


// @desc Decrease the number of notifications by one
// @route PUT /api/commerces/notifications
// @access Private
const updateNotification = asyncHandler(async (req, res) => {
    const commerce = await Commerce.findById(req.body.id)
    if (commerce) {
        commerce.notifications = commerce.notifications - 1
        const updatedCommerce = await commerce.save();
        res.status(200).json({
            _id: commerce._id,
            notifications: commerce.notifications
        })
    } else {
        res.status(404)
        throw new Error('Commerce not found')
    }
});

export { getCommerces, createCommerce, getCommercesByType, loginCommerce, getCommercesById, updateCommerce, updateNotification }
