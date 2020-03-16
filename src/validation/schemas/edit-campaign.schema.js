import Joi from '@hapi/joi';

export default Joi.object({
  campaignName: Joi.string(),

  itemCategories: Joi.string(),

  minItemCount: Joi.object({
	isOpen: Joi.boolean().required(),
		value:  [
        Joi.string(),
        Joi.number()
    ],
})
    .required(),

  discountPrice: Joi.object({  
        isOpen: Joi.boolean().requir
ed(),
                value:  [
        Joi.string(),
        Joi.number()
    ],
})
    .required(),

  numOfDays:Joi.object({  
        isOpen: Joi.boolean().required(),
                value:  [
        Joi.string(),
        Joi.number()
    ],
})
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
