import express, { Request, Response } from "express";
import * as swiftController from "../controllers/swiftController";

const router = express.Router();

router.get("/swift-codes/:param", swiftController.routeSwiftOrIso2);
router.post("/swift-codes", swiftController.postCode);
router.delete("/swift-codes/:code", swiftController.deleteCode);

export default router;
