import express, { Request, Response } from "express";
import { connectToDatabase } from "./config/db.config";
import logger from "morgan";
import helmet from "helmet";
import router from "./routes/index";
import cors from "cors";

const app = express();
const HOST = process.env.HOST || "http://localhost";
const PORT = parseInt(process.env.PORT || "4000");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet());
app.use(
	cors({
		origin: "*",
	})
);
app.use(logger("tiny"));

app.use("/api", router);

app.use((err:Error, req: Request, res: Response) => {
  console.log(err,'err')
	res.status(500).send({
		error: {
      status:false,
			message: 'Internal Server Error',
		},
	});
});

app.listen(PORT, async () => {
	await connectToDatabase();
	console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
