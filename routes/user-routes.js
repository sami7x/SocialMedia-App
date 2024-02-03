//importing the modules
import express from "express";
import {
  getAllUser,
  signup,
  login,
  logout,
  getOnlyOneUser,
} from "../controller/user-controller.js";
import { validateToken } from "../middleware/validateTokenHandler.js";
const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// router.get("/current", validateToken, currentUser);
router.get("/:userId", validateToken, getOnlyOneUser);

export default router;
