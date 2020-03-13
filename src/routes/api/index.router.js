import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import HomeController from '../../controllers/home.controller';
import swaggerDocument from '../../api-docs/swagger.json';
import { ROUTES } from '../../constants/index';

const { apiDocs, home } = ROUTES;
const { helloWorld } = HomeController;
const router = Router();

const options = {
  explorer: true,
};

router.get(home, helloWorld);
router.use(apiDocs, serve);
router.get(apiDocs, setup(swaggerDocument, options));

export default router;
