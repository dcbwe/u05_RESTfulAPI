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
    async upsert(filter, data, options = { new: true, upsert: true, setDefaultsOnInsert: true }) {
        return this.model.findOneAndUpdate(
            filter,
            data,
            options
        );
    }
}
  
module.exports = BaseRepository;
  