import { pick, isEmpty } from 'lodash';
import Response from '../helpers/response.helper';
import Models from '../models/index';

const { Campaign } = Models;
const {
  ok, created, error, notFound, updated,
} = Response;

/**
 * This class controls anything related to discount campaigns
 * such as finding, adding, updating e.t.c.
 */
export default class CampaignController {
  /**
   * This class controls anything related to discount campaigns
   * @param {Object} req - the details of campaign to be uploaded
   * @param {Object} res - the response sent to the user
   * @returns {Object} the newly created campaign
   */
  static async create(req, res) {
    const campaign = pick(req.body, ['id', 'campaignName', 'discountType', 'itemCategories', 'count',
      'minItemCount', 'discountPrice', 'numOfDays', 'validTill',
      'totalRedemptions', 'isCategoryMenuOpen']);

    try {
      const newCampaign = await Campaign.create(campaign);

      return created(newCampaign._doc, res);
    } catch (e) {
      return error(e, res);
    }
  }

  /**
   * Updates a campaign
   * @param {Object} req - http request object
   * @param {Object} res - http response object
   * @return {Object} the latest campaign info after it has been updated
   */
  static async edit(req, res) {
    const { id } = req.params;
    const info = { ...req.body };

    // if nothing was changed, then update nothing
    if (isEmpty(info)) {
      return notModified(res);
    }

    try {
      // check if the campaign is existing firstly
      const campaign = await Campaign.findOne({ id });

      if (!campaign) return notFound('campaign', res);

      // if the campaign exists, then update it
      await Campaign.updateOne({ id }, info);

      return updated('campaign', res);
    } catch (e) {
      return error(e, res);
    }
  }

  /**
   * This function gets all the campaigns in the database
   * @param {Object} req - a single fetch request
   * @param {Object} res - to be sent back to the user
   * @returns {Object} the list of campaigns available in the database
   */
  static async getAll(req, res) {
    let campaigns = [];
    let count = 0;

    try {
      campaigns = await Campaign.find({});

      // ... no campaigns found, return error ...
      if (!campaigns.length) {
        const data = {
          count,
          campaigns,
        };

        return ok(data, res);
      }

      // update the count here
      count = campaigns.length;

      const data = {
        count,
        campaigns,
      };

      return ok(data, res);
    } catch (e) {
      error(e, res);
    }
  }
}
