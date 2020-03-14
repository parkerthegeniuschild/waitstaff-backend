import { Schema, model } from 'mongoose';

const campaignSchema = new Schema({
  id: String,
  campaignName: String,
  itemCategories: String,
  discountType: String,
  minItemCount: Object,
  discountPrice: Object,
  numOfDays: Object,
  totalRedemptions: Number,
  isCategoryMenuOpen: Boolean,
  validTill: String,
  createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

const CampaignModel = model('Campaign', campaignSchema);

export default CampaignModel;
