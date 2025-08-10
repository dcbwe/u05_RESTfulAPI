const mongoose = require('mongoose');
const pRetry = require('p-retry');

class TransactionManager {
    /**
    * mongo transaction with retry
    *
    * @param {Function} work async session
    * @returns {Promise<any>}
    */
    async execute(work) {
        const session = await mongoose.startSession();
        try {
            return await session.withTransaction(
                async () => work(session),
                {
                    maxCommitTimeMS: 10000,
                    writeConcern: { w: 'majority' }
                }
            );
        } finally {
            session.endSession();
        }
    }

    /**
    * retry upon execute
    * @param {Function} work
    */
    async executeWithRetry(work) {
        return pRetry(() => this.execute(work), {
            retries: 2,
            factor: 2,
            onFailedAttempt: err => {
                console.warn(
                    `transaction attempt ${err.attemptNumber} failed ` +
                    `${err.retriesLeft} retries left`
                );
            }
        });
    }
}

module.exports = TransactionManager;