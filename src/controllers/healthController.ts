import { Request, Response } from 'express';

export const checkHealth = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running.' });
};
