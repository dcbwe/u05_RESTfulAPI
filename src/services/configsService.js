const configs = require('../config/configs');
const { toConfigsDto, toConfigOptionsDto } = require('../utils/configsSerializer');

class ConfigsService {
    getAll() {
        return toConfigsDto(configs);
    }
    
    getOne(key) {
        return toConfigOptionsDto(configs, key);
    }
}

module.exports = new ConfigsService();
