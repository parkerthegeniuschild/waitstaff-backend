import Response from '../helpers/response.helper';

const { ok } = Response;

/**
 * This class creates the welcome response
 */
export default class HomeController {
  /**
     * Hello World to test the functions
     * @param {Object} req - http request object
     * @param {Object} res - http response object
     * @returns {Object}  returns success/200 object
     */
  static helloWorld(req, res) {
    return ok({ message: 'Welcome to Wait Staff !!!' }, res);
  }
}
