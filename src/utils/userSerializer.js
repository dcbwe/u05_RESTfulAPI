function toDto(user) {
    const { _id: id, email, active, verified, createdAt, updatedAt } = user;
    return { id, email, active, verified, createdAt, updatedAt };
}
  
module.exports = { toDto };