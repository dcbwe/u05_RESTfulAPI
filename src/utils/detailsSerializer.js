/**
 * serializes a details mongo document into DTO.
 * @param {Object} details mongo document or plain object
 * @returns {Object} details DTO for API responses
 */
function toDetailsDto(details) {
    const obj = typeof details.toJSON === 'function'
        ? details.toJSON()
        : { ...details };
  
    const {
        id,
        userId,
        height,
        weight,
        dailyRoutine,
        trainingLevel,
        createdAt,
        updatedAt
    } = obj;

    return {
        id,
        userId,
        height,
        weight,
        dailyRoutine,
        trainingLevel,
        createdAt,
        updatedAt
    };
}
  
module.exports = { toDetailsDto };
  