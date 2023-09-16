import express from "express";
import userRoutes from "./user.routes";
import candidateRoutes from "./candidate.routes";
import partyRoutes from "./party.routes";
import constituencyRoutes from "./constituency.routes";
import votingRoutes from "./voting.routes";
import electionsRoutes from "./election.routes";
import adminRoutes from "./admin.routes";
import inviteRoutes from "./invite.routes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/candidates", candidateRoutes);
router.use("/parties", partyRoutes);
router.use("/constituencies", constituencyRoutes);
router.use("/voting", votingRoutes);
router.use("/elections", electionsRoutes);
router.use("/admin", adminRoutes);
router.use("/invites", inviteRoutes );

export default router;
