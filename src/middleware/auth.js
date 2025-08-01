const { ApiError }        = require('../utils/apiError');
const jwtService          = require('../services/jwtServiceInstance');
const userService         = require('../services/userService');

/**
 * authentication middleware:
 * 1) get bearer-token from authorization-header
 * 2) verifierar jwt
 * 3) get user från db and injict to req.user
 * 4) throw ApiError.unauthorized upon error
 */
async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer '))
      throw ApiError.unauthorized('missing Authorization header');

    const token = header.split(' ')[1];
    const payload = jwtService.verify(token);

    const user = await userService.getById(payload.userId);
    if (!user)
      throw ApiError.unauthorized('user not found');

    req.user = user;
    next();
  } catch (err) {
    return next(
      err instanceof ApiError
        ? err
        : ApiError.unauthorized('invalid or expired token')
    );
  }
}

module.exports = authenticate;
