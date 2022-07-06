import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// @desc Register User
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    const { email, password, firstName, lastName, phone, adress } = req.body;

    console.log('body', req.body);
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).send('Test message erreur')
        throw new Error("User already exists")
    }

    const user = await User.create({
        email,
        password,
        firstName,
        lastName,
        adress,
        phone,
    });

    console.log('user', user);
    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User not found')
    }

});

// @desc Register User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    console.log('user', user)
    const secret = process.env.JWT_SECRET;
    if(!user) {
        return res.status(400).send('The user not found');
    }

    console.log("userpassword", user.password)
    console.log("bodypassword", req.body.password)
    console.log("PASSEZ CI")
    console.log(bcrypt.compare(req.body.password, user.password))
    if(user && bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '365d'}
        )
        res.status(200).send({user: user.email , token: token})
    } else {
        res.status(400).send('password is wrong!');
    }
});

// @desc Find User by email
// @route GET /api/users/email/:email
// @access Public
const findUserByEmail = asyncHandler(async (req, res) => {
    const {email} = req.params
    const user = await User.findOne({email});
    console.log("user", user)
    if (user) {
        res.json({user})
    } else {
        res.status(404)
        throw new Error("Commande not found")
    }
});

// @desc Reset password of user
// @route POST /api/users/password
// @access Public
const resetPassword = asyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    const { password } = req.body
    if(!user) {
        return res.status(400).send('The user not found');
    }
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    const updatedUser = await user.save();
    console.log('updated', updatedUser)
    return res.status(200).json({updatedUser})
});

// @desc Get User
// @route GET /api/users/:id
// @access Public
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    }
    res.status(200).send(user);
});


// @desc Update User
// @route PUT /api/users
// @access Public
const updateUser = asyncHandler(async (req, res) => {

    const {
        email,
        image,
        firstName,
        lastName,
        phone,
        id,
        address,
        postalCode,
        ville,
        pseudo,
        pays,
        addPortefeuille,
        minusPortefeuille,
        notificationsTitle,
        notificationsBody,
        notificationsImage,
        portefeuille,
        unreadMessages,
        rating,
        rateur,
        notifications,
        commentaire,
    } = req.body;

    const user = await User.findById(id).select('-passwordHash');


    console.log('body', req.body);

    const commentaireUser = {
        rating,
        rateur,
        commentaire
    };

    const notification = {
        notificationsTitle,
        notificationsBody,
        notificationsImage
    }

    if (rating) {
        user.avis.push(commentaireUser)
    }


    if (notificationsTitle) {
        user.notifications.push(notification)
    }

    if (addPortefeuille) {
        user.portefeuille = Number(user.portefeuille) + Number(addPortefeuille)
    }

    if (minusPortefeuille && user.portefeuille > 0) {
        user.portefeuille = Number(user.portefeuille) - Number(minusPortefeuille)
    }

    if (notifications) {
        user.notifications = notifications
    }

    if (user) {
        user.email = email || user.email
        user.firstName = firstName || user.firstName
        user.lastName = lastName || user.lastName
        user.phone = phone || user.phone
        user.image = image || user.image
        user.address = address || user.address
        user.postalCode = postalCode || user.postalCode
        user.ville = ville || user.ville
        user.pays = pays || user.pays
        user.portefeuille = portefeuille || user.portefeuille
        user.pseudo = pseudo || user.pseudo
        user.unreadMessages = unreadMessages || user.unreadMessages

        const updatedUser = await user.save();
        console.log('updated', updatedUser)
        res.status(200).json({updatedUser})
    } else {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    }
});

// @desc Update User
// @route PUT /api/users/unreadmessages
// @access Public
const updateUserUnreadMessages = asyncHandler(async (req, res) => {

    const {id} = req.body;

    const user = await User.findById(id).select('-passwordHash');


    console.log('id', id);

    if (user) {
        user.unreadMessages = 0

        const updatedUser = await user.save();
        console.log('updated', updatedUser)
        res.status(200).json({updatedUser})
    } else {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    }
});

// @desc Update User photo
// @route PUT /api/users/photo
// @access Public
const updateUserPhoto = asyncHandler(async (req, res) => {

    const {id, photo} = req.body;

    const user = await User.findById(id).select('-passwordHash');


    console.log('id', id);

    if (user) {
        user.photo = photo

        const updatedUser = await user.save();
        console.log('updated', updatedUser)
        res.status(200).json({updatedUser})
    } else {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    }
});

// @desc Update User
// @route PUT /api/users/portefeuille
// @access Public
const updateUserPortefeuille = asyncHandler(async (req, res) => {

    const {id} = req.body;
    const user = await User.findById(id).select('-passwordHash');
    console.log('id', id);

    if (user) {
        user.portefeuille = 0
        const updatedUser = await user.save();
        console.log('updated', updatedUser)
        res.status(200).json({updatedUser})
    } else {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    }
});

export { registerUser, loginUser, getUser, updateUser, updateUserUnreadMessages, updateUserPortefeuille, updateUserPhoto, findUserByEmail, resetPassword }
