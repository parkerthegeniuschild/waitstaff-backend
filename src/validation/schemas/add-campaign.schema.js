import Joi from '@hapi/joi';

export default Joi.object({
  campaignName: Joi.string()
    .required(),

  discountType: Joi.string()
    .valid('BOGO Discount', 'Price-Based Discount', 'Time-Based Discount')
    .required(),

  category: Joi.string()
    .required(),

  count: Joi.number()
    .integer()
    .required(),

  price: Joi.number()
    .integer()
    .required(),

  days: Joi.number()
    .integer()
    .required(),
});
