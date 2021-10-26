import * as express from 'express';
import referralController from '../../controllers/referrals';

const router = express.Router({
  mergeParams: true,
});

router.get('/', async (req: express.Request, res: express.Response) => {
  return await referralController.getAllReferrals(req, res);
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
  return await referralController.getReferralById(req, res);
});

router.post('/', async (req: express.Request, res: express.Response) => {
  return await referralController.createReferral(req, res);
});

router.put('/:id', async (req: express.Request, res: express.Response) => {
  return await referralController.updateReferralById(req, res);
});

router.delete('/:id', async (req: express.Request, res: express.Response) => {
  return await referralController.deleteReferralById(req, res);
});

export default router;
