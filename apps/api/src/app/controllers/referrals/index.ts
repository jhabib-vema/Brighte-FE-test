import { Request, Response } from 'express';
import prisma from '../../prisma';


// TODO: Better approach for responses/HTTP codes
const getAllReferrals = async (req: Request, res: Response) => {
  const referrals = await prisma.referral.findMany();

  res.json(referrals);
};

const getReferralById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const referral = await prisma.referral.findUnique({
    where: { id: Number(id) },
  });

  res.json(referral);
};

const updateReferralById = async (req: Request, res: Response) => {
  const payload = req.body;
  const id = Number(req.params.id);
  const referral = await prisma.referral.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });

  res.json(referral);
};

const deleteReferralById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  console.log({ id });
  const referral = await prisma.referral.delete({
    where: {
      id,
    },
  });

  res.json(referral);
};

const createReferral = async (req: Request, res: Response) => {
  const payload = req.body;
  const referral = await prisma.referral.create({
    data: { ...payload },
  });

  res.json(referral);
};

export default {
  getAllReferrals,
  getReferralById,
  updateReferralById,
  deleteReferralById,
  createReferral,
};
