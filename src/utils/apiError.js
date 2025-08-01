class ApiError extends Error {
    constructor(status, message, details = null) {
        super(message);
        this.status  = status;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
  
    static badRequest(message = 'Bad Request') {
        return new ApiError(400, message);
    }
    static validationFailed(errors = []) {
        return new ApiError(400, 'Validation failed', errors);
    }  
    static unauthorized(message = 'Unauthorized') {
        return new ApiError(401, message);
    }
    static forbidden(message = 'Forbidden') {
        return new ApiError(403, message);
    }
    static notFound(message = 'Not Found') {
        return new ApiError(404, message);
    }
    static conflict(message = 'Conflict') {
        return new ApiError(409, message);
    }
    static expired(message = 'Expired') {
        return new ApiError(410, message);
    }
    static internal(message = 'Internal Server Error') {
        return new ApiError(500, message);
    }
}
  
function errorHandler(err, req, res, next) {
    const isApiError = err instanceof ApiError;
    const status     = isApiError ? err.status : 500;
    const payload    = { error: err.message || 'Internal Server Error' };
    
    if (isApiError && err.details) {
        payload.details = err.details;
    }
    
    if (status >= 500) {
        console.error(err);
    }
    
    res.status(status).json(payload);
}
  
module.exports = { ApiError, errorHandler };
  