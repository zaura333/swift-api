import { Request, Response } from 'express';
import * as service from '../services/swiftService';

export const routeSwiftOrIso2 = (req: Request, res: Response) => {
  const param = req.params.param.toUpperCase();

  if (param.length === 2) {
    // Handle as ISO2 country code
    getCountryCodes(req, res);
  } else if (param.length === 11) {
    // Handle as SWIFT code
    getCode(req, res);
  } else {
    // Invalid input
    res.status(400).json({
      error:
        'Invalid code format. Please type 11-character SWIFT code or ISO2 country code.',
    });
  }
};

async function getCode(req: Request, res: Response) {
  try {
    const result = await service.getCode(req.params.param);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}

async function getCountryCodes(req: Request, res: Response) {
  try {
    const result = await service.getCountryCodes(req.params.param);
    res.status(200).send(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}

export const postCode = async (req: Request, res: Response) => {
  const { address, bankName, countryISO2, swiftCode, isHeadquarter } = req.body;

  if (
    !req.body.address ||
    !req.body.bankName ||
    !req.body.countryISO2 ||
    !req.body.swiftCode
  ) {
    res.status(400).json({
      error: 'Missing required fields.',
    });
    return;
  }

  try {
    await service.postCode(
      address.toUpperCase(),
      bankName.toUpperCase(),
      countryISO2.toUpperCase(),
      swiftCode.toUpperCase(),
      isHeadquarter
    );
    res.status(201).json({ message: 'Swift code added successfully.' });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteCode = async (req: Request, res: Response) => {
  try {
    await service.deleteCode(req.params.code);
    res.status(200).json({ message: 'Swift code deleted successfully.' });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
