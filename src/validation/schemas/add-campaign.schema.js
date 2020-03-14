import Joi from '@hapi/joi';

export default Joi.object({
  id: Joi.string()
    .required(),

  campaignName: Joi.string()
    .required(),

  discountType: Joi.string()
    .valid('BOGO Discount', 'Price-Based Discount', 'Time-Based Discount')
    .required(),

  itemCategories: Joi.string()
    .required(),

  minItemCount: Joi.object({
    isOpen: Joi.boolean().required(),
    value: Joi.number().required(),
  })
    .required(),

  discountPrice: Joi.object({
    isOpen: Joi.boolean().required(),
    value: Joi.number().required(),
  })
    .required(),

  numOfDays: Joi.object({
    isOpen: Joi.boolean().required(),
    value: Joi.number().required(),
  })
    .required(),

  validTill: Joi.string()
    .required(),

  totalRedemptions: Joi.number()
    .required(),

  isCategoryMenuOpen: Joi.boolean()
    .required(),
});
