import Joi from '@hapi/joi';

export default Joi.object({
  campaignName: Joi.string(),

  itemCategories: Joi.string(),

  minItemCount: Joi.object()
    .required(),

  discountPrice: Joi.object()
    .required(),

  numOfDays: Joi.object()
    .required(),

  discountType: Joi.string(),

  id: Joi.string().required(),

  validTill: Joi.string()
    .required(),

  totalRedemptions: Joi.number()
    .required(),

  isCategoryMenuOpen: Joi.boolean()
    .required(),
});
