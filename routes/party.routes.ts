import express from "express";
import * as PartyController from "../controllers/party.controller";

const router = express.Router();

router.get("/", PartyController.getAll);
router.get("/:id", PartyController.getById);
router.post("/", PartyController.create);
router.put("/:id", PartyController.update);
router.delete("/:id", PartyController.remove);

export default router;
