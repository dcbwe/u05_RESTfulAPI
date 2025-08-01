/**
 * serializes a profile mongo document into DTO.
 * @param {Object} profile  mongo document or plain object
 * @returns {Object} profile DTO for API responses
 */
function toProfileDto(profile) {
    const obj = typeof profile.toJSON === 'function'
        ? profile.toJSON()
        : { ...profile };
  
    const {
        _id,
        id = _id,
        userId,
        firstname,
        lastname,
        birthYear,
        gender,
        city,
        country,
        createdAt,
        updatedAt,
        fullName,
        age
    } = obj;
  
    return {
        id,
        userId,
        firstname,
        lastname,
        birthYear,
        gender,
        city,
        country,
        createdAt,
        updatedAt,
        fullName,
        age
    };
}
  
module.exports = { toProfileDto };
  