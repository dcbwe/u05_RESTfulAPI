class CORSConfig {
    /**
     * @param {Object} options
     * @param {string[]} options.allowedOrigins
     * @param {boolean} options.credentials
     * @param {string[]} [options.allowedMethods]
     * @param {string[]} [options.allowedHeaders]
     */
    constructor({
      allowedOrigins,
      credentials = true,
      allowedMethods = ['GET','POST','PUT','DELETE','OPTIONS'],
      allowedHeaders = ['Content-Type','Authorization']
    }) {
      this.allowedOrigins = allowedOrigins;
      this.credentials = credentials;
      this.allowedMethods = allowedMethods;
      this.allowedHeaders = allowedHeaders;
    }
  
    getOptions() {
      return {
        origin: (origin, callback) => {
          if (!origin) return callback(null, true);
          const allowed = this.allowedOrigins.some(pattern =>
            new RegExp(pattern).test(origin)
          );
          callback(allowed ? null : new Error('Origin not allowed by CORS'), allowed);
        },
        credentials: this.credentials,
        methods: this.allowedMethods,
        allowedHeaders: this.allowedHeaders,
        exposedHeaders: ['X-Request-Id', 'ETag'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
        maxAge: 86400
      };
    }
  }
  
  module.exports = CORSConfig;
  