import express from "express";
import * as UsersController from "../controllers/user.controller";
import { userValidationSchema } from "../utils/validations";
import validate from "../middlewares/validate";
import errorHandler from "../utils/errorHandler";

const router = express.Router();

router.post("/login", errorHandler(UsersController.login));
router.post(
	"/signup",
	validate(userValidationSchema),
	errorHandler(UsersController.create)
);
router.get("/find/:id", errorHandler(UsersController.getById));
router.get("/find", errorHandler(UsersController.getAll));
router.get(
	"/candidates/:id",
	errorHandler(UsersController.getCandidateByUserId)
);
router.post("/profile", errorHandler(UsersController.uploadPic));

export default router;
