module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('preferences', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: DataTypes.DATE,
      updated: DataTypes.DATE,
      title: DataTypes.STRING,
      latitude: DataTypes.INTEGER,
      longitude: DataTypes.INTEGER,
      authorId: {
        type: DataTypes.INTEGER,
        foreignKey: true
      }
    })
    .complete(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('preferences')
    .complete(done);
  }
}
