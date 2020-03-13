import Joi from '@hapi/joi';

export default Joi.object({
  campaignName: Joi.string(),

  category: Joi.string(),

  count: Joi.number()
    .integer(),

  price: Joi.number()
    .integer(),

  days: Joi.number()
    .integer(),
});
