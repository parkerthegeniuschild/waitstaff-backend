import { Schema, model } from 'mongoose';

const campaignSchema = new Schema({
  campaignName: String,
  category: String,
  discountType: String,
  count: Number,
  price: Number,
  days: Number,
  redemptions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

const CampaignModel = model('Campaign', campaignSchema);

export default CampaignModel;
