import express from "express";
import * as swiftController from "../controllers/swiftController.js";

const router = express.Router();

router.get("/swift-codes/:code", swiftController.getCode);
// router.get("/swift-codes/country/:iso2", swiftController.getCountryCodes);
// router.post("/swift-codes", swiftController.createCode);
// router.delete("/swift-codes/:code", swiftController.deleteCode);

export default router;
