module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  });

  User.associate = function (models) {
    User.belongsToMany(models.Lego, {
      through: "UserLegos",
      foreignKey: "userId",
    });
  };

  return User;
};
