import express, { Request, Response } from 'express';
import * as swiftController from '../controllers/swiftController';
import { checkHealth } from '../controllers/healthController';

const router = express.Router();

router.get('/health', checkHealth);
router.get('/v1/swift-codes/:param', swiftController.routeSwiftOrIso2);
router.post('/v1/swift-codes', swiftController.postCode);
router.delete('/v1/swift-codes/:code', swiftController.deleteCode);

export default router;
