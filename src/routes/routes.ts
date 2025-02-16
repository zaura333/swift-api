import express, { Request, Response } from "express";
import * as swiftController from "../controllers/swiftController.js";

const router = express.Router();

router.get("/swift-codes/:param", swiftController.routeSwiftOrIso2);
// router.post("/swift-codes", swiftController.createCode);
// router.delete("/swift-codes/:code", swiftController.deleteCode);

export default router;
