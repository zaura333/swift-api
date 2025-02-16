import { ErrorRequestHandler, Request, Response } from "express";
import * as service from "../services/swiftService.js";

export async function getCode(req: Request, res: Response) {
  try {
    const result = await service.getCode(req.params.code);
    res.status(200).send(result);
  } catch (error) {
    res.status(404);
  }
}
