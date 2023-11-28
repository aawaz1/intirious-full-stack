import express from 'express';
const router = express.Router();
import {getUserById,logoutUser,registeredUser,getUserProfile,createUser,getUsers,updateUser,updateUserProfile,authUser ,deleteUsers} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

router.route("/").post(registeredUser,).get(protect,admin,getUsers);
router.post("/logout",logoutUser);
router.post("/createuser", createUser ,protect,admin)
router.post("/auth",authUser);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);
router.route("/:id").delete(protect,admin,deleteUsers).get(protect,admin,getUserById).put(protect,admin,updateUser);

export default router;





