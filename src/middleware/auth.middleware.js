import jwt from 'jsonwebtoken';
import fs from 'fs';
import pify from 'pify';
import appRoot from 'app-root-path';
import Response from '../helpers/response.helper';
import Utils from '../helpers/utils.helper';

const { badToken, error } = Response;
const { checkForToken } = Utils;

export default {
  /**
   * Checks to see if user is logged in
   * @param {Object} req - data pass from the token
   * @param {Object} res - response passed back
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  isLoggedIn: async (req, res, next) => {
    const token = checkForToken(req);

    if (!token) {
      return badToken(res);
    }

    try {
      const algorithm = 'RS256';
      const publicKey = await pify(fs.readFile)(`${appRoot}/.public.pem`, 'utf8');

      // verify the token and add the data into the request body along with original content
      req.body = {
        ...req.body,
        user: jwt.verify(token, publicKey, { algorithm }),
      };

      return next();
    } catch (e) {
      return error(e, res);
    }
  },
};
