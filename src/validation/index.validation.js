import Response from '../helpers/response.helper';
import Helpers from '../helpers/utils.helper';
import Schemas from './schemas/index';

const {
  addCampaignSchema, editCampaignSchema,
} = Schemas;

const { trimInputs } = Helpers;
const { error } = Response;

export default {
  createCampaign: async (req, res, next) => {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await addCampaignSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (e) {
      return error(e, res);
    }
  },


  editCampaign: async (req, res, next) => {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await editCampaignSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (e) {
      return error(e, res);
    }
  },
};
