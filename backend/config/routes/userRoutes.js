import express from "express";
import {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    updateUserUnreadMessages,
    updateUserPortefeuille,
    updateUserPhoto,
    findUserByEmail,
    resetPassword
} from "../controllers/userController.js";

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/unreadmessages').put(updateUserUnreadMessages);
router.route('/portefeuille').put(updateUserPortefeuille);
router.route('/photo').put(updateUserPhoto);
router.route('/email/:email').get(findUserByEmail);
router.route('/password').post(resetPassword);
router.route('/:id').get(getUser);
router.route('/').put(updateUser);

export default router;
