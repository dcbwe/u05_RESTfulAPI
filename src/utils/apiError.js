/**
 * Handle errors gracefully :D
 */
class ApiError extends Error {
    /**
     * @param {number} status  200, etc..
     * @param {string} message error message
     */
    constructor(status, message) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
  
    /**
     * 409 factory
     * @param {string} message
     */
    static conflict(message = 'Conflict') {
        return new ApiError(409, message);
    }
  
    /**
     * 404 factory
     * @param {string} message
     */
    static notFound(message = 'Not Found') {
        return new ApiError(404, message);
    }
  
    /**
     * 400 factory
     * @param {string} message
     */
    static badRequest(message = 'Bad Request') {
        return new ApiError(400, message);
    }
}
  
/**
* Global error-midware | fallback 500
*/
function errorHandler(err, req, res, next) {
    const status  = err instanceof ApiError ? err.status : 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
}
  
module.exports = { ApiError, errorHandler };
  