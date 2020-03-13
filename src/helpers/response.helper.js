import {
  OK, CREATED, UNPROCESSABLE_ENTITY, NOT_FOUND, UNAUTHORIZED,
} from 'http-status-codes';

export default {
  /**
     * Handles the success message on a get request
     * @param {Object} data - the data fetched
     * @param {Object} res - response object passed along
     * @return {Object} the data returned by get request
     */
  ok: (data, res) => {
    res.status(OK).json({
      status: 'success',
      data,
    });
  },

  /**
     * Handles error when something searched for is not found
     * @param {String} item - the item being searched for
     * @param {Object} res - response object passed along
     * @return {Object} the data returned by search request
     */
  notFound: (item, res) => {
    res.status(NOT_FOUND).json({
      status: 'error',
      message: `${item} not found`,
    });
  },

  /**
     * Handles the success message on data creation
     * @param {Object} data - the newly created data
     * @param {Object} res - response object passed along
     * @return {Object} the created message
     */
  created: (data, res) => {
    res.status(CREATED).json({
      status: 'success',
      data,
    });
  },

  /**
     * Handles error message from catch blocks
     * @param {Object} e - error returned from internal process
     * @param {Object} res - response object passed along
     * @return {Object} the error message
     */
  error: (e, res) => {
    res.status(UNPROCESSABLE_ENTITY).json({
      status: 'error',
      message: e.message,
    });
  },

  /**
     * Returns an error when accessing a protected route
     * @param {Object} res - response object passed along
     * @return {Object} the error message
     */
  badToken: (res) => {
    res.status(UNAUTHORIZED).json({
      status: 'error',
      message: 'you must be logged in to proceed'
    });
  },


  /**
     * Returns a message when nothing was updated
     * @param {Object} res - response object passed along
     * @return {Object} the return message
     */
  notModified: (res) => {
    res.status(OK).json({
      status: 'success',
      message: 'nothing was updated'
    });
  },

  /**
     * Returns a response when an item is updated successfully
     * @param {String} item - what was updated
     * @param {Object} res - response object passed along
     * @return {Object} the return message
     */
  updated: (item, res) => {
    res.status(CREATED).json({
      status: 'success',
      message: `${item} has been updated successfully`
    });
  },
};
