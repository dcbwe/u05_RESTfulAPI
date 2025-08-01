class BaseRepository {
    constructor(model) { 
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findById(id) {
        return this.model.findById(id);
    }
    async update(id, d) {
        return this.model.findByIdAndUpdate(id, d, { new: true });
    }
    async delete(id) {
        return this.model.findByIdAndDelete(id);
    }
    async findAll() {
        return this.model.find();
    }
    /**
    * Uppdaterar eller skapar ett dokument baserat på filter.
    * @param {Object} filter   Query­objekt för att hitta dokumentet.
    * @param {Object} data     Fält att $set:a.
    * @param {Object} [options] Mongoose-op­tions (upsert, new, setDefaultsOnInsert…).
    */
    async upsert(filter, data, options = { new: true, upsert: true, setDefaultsOnInsert: true }) {
        return this.model.findOneAndUpdate(
            filter,
            data,
            options
        );
    }
}
  
module.exports = BaseRepository;
  