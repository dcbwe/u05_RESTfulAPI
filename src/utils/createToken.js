const crypto = require('crypto');

/**
 * generate hex-token with n bytes
 * @param {number} [size] bytes total
 * @returns {string} hex-code
 */
function generateToken(size) {
  return crypto.randomBytes(size).toString('hex');
}

module.exports = { generateToken };
