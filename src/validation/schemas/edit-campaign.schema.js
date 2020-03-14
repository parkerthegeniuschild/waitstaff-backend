import Joi from '@hapi/joi';

export default Joi.object({
  campaignName: Joi.string(),

  itemCategories: Joi.string(),

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
