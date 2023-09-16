import multer from "multer";
import { RequestHandler } from "express";

const MIME_TYPE_MAP = {
	"image/png": "png",
	"image/jpeg": "jpeg",
	"image/jpg": "jpg",
};

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.fieldname + ".png");
	},
});

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		const isValid = !!MIME_TYPE_MAP[file.mimetype];
		const error = isValid ? null : { status:false, message: "Invalid File" };
		cb(error, isValid);
	}
};

const uploadMiddleware = multer({
	storage: storage,
	fileFilter: multerFilter,
}).single("image")

export const upload: RequestHandler = (req, res, next) => {
	uploadMiddleware(req, res, (error) => {
		if (error instanceof multer.MulterError) {
			res.status(400).send(error, );
		} else if (error) {
			res.status(400).send(error);
		} else {
			next();
		}
	});
};
