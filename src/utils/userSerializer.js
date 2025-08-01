/**
 * serializes a profile mongo document into DTO.
 * @param {Object} user  mongo document or plain object
 * @returns {Object} profile DTO for API responses
 */
function toUserDto(user) {
    const obj = typeof user.toJSON === 'function'
        ? user.toJSON()
        : { ...user };
  
    const { id, email, active, verified, createdAt, updatedAt } = obj;

    return { id, email, active, verified, createdAt, updatedAt };
}
  
module.exports = { toUserDto };