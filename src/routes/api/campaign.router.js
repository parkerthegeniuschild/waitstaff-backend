import { Router } from 'express';
import CampaignController from '../../controllers/campaign.controller';
import { ROUTES } from '../../constants/index';
import Validator from '../../validation/index.validation';

const { newCampaign, modifyCampaign, getAllCampaigns } = ROUTES;
const { createCampaign, editCampaign, } = Validator;
const { create, edit, getAll } = CampaignController;

const router = Router();

router.post(newCampaign, createCampaign, create);
router.patch(modifyCampaign, editCampaign, edit);
router.get(getAllCampaigns, getAll);

export default router;
