module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('users',
      {id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
    .complete(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('users')
    // add reverting commands here, calling 'done' when finished
    .complete(done);
  }
};
