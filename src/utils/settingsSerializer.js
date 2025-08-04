/**
 * serializes a Settings mongo document into DTO.
 * @param {Object} settings mongo document or plain object
 * @returns {Object} Settings DTO for API responses
 */
function toSettingsDto(settings) {
    const obj = typeof settings.toJSON === 'function'
        ? settings.toJSON()
        : { ...settings };
  
    const {
        id,
        userId,
        language,
        units,
        darkMode,
        notifications,
        createdAt,
        updatedAt
    } = obj;
        
    return {
        id,
        userId,
        language,
        units,
        darkMode,
        notifications: {
          email: notifications.email,
          sms:   notifications.sms
        },
        createdAt,
        updatedAt
    };    
}
  
module.exports = { toSettingsDto };
  