module.exports = function (sequelize, DataTypes) {
  const UserLegos = sequelize.define(
    "UserLegos",
    {
      userId: DataTypes.INTEGER,
      legoId: DataTypes.INTEGER,
    },
    { timestamps: false }
  );

  return UserLegos;
};
