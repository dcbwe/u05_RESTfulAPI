function toConfigsDto(configs) {
    const out = {};
    Object.keys(configs).forEach((key) => {
        const { options } = configs[key];
        if (options) out[key] = { options };
    });
    return out;
}
  
function toConfigOptionsDto(configs, key) {
    const cfg = configs[key];
    return cfg && Array.isArray(cfg.options) ? cfg.options : [];
}

module.exports = { toConfigsDto, toConfigOptionsDto };
  