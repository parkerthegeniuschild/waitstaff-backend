import jwt from 'jsonwebtoken';
import fs from 'fs';
import appRoot from 'app-root-path';
import pify from 'pify';
import { isUndefined } from 'lodash';

export default {

  trimInputs: (form) => {
    // replace every value with trimmed content, except arrays
    const arr = Object.keys(form);

    for (let i = 0; i < arr.length; i += 1) {
      if (Object.prototype.hasOwnProperty.call(form, arr[i])) {
        if (Array.isArray(form[arr[i]]) || form[arr[i]] instanceof Object) continue;
        form[arr[i]] = form[arr[i]].trim();
      }
    }

    return form;
  },

  /**
   * Creates a secure and signed transport cookie
   * @param {String} name - how to call the cookie
   * @param {String} value - the value/content of the cookie
   * @param {Object} res
   * @return {String} the signed cookie
   */
  createCookie: (name, value, res) => res.cookie(name, value, {
    expires: new Date(Date.now() + 3600000),
    secure: true,
    httpOnly: true,
    signed: true,
  }),

  /**
   * Generates a JWT for authentication purposes
   * @param {Object} payload - the data needed to identify a user
   * @return {String} token - the newly created token
   */
  createJWT: async (payload) => {
    const algorithm = 'RS256';
    const privateKey = await pify(fs.readFile)(`${appRoot}/.private.pem`, 'utf8');

    return jwt.sign(payload, privateKey, {
      algorithm,
      expiresIn: '1h'
    });
  },


  /**
   * Checks if a token is included in the request authorization header
   * @param {Object} req - the incoming request
   * @return {String} returns either the token or undefined
   */
  checkForToken: (req) => {
    const { authorization } = req.headers;

    return (!isUndefined(authorization) && authorization.includes('Bearer'))
      ? authorization.replace('Bearer ', '') : req.cookies.token;
  },
};
