//importing the modules
import express from "express";
import {getAllUser, signup} from "../controller/user-controller.js";
const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signup)
export default router;