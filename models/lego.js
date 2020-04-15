module.exports = function (sequelize, DataTypes) {
  const Lego = sequelize.define("Lego", {
    name: DataTypes.STRING,
    numberOfPieces: DataTypes.INTEGER,
    setNumber: DataTypes.INTEGER,
    imageURL: DataTypes.STRING,
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });

  Lego.associate = function (models) {
    Lego.belongsToMany(models.User, {
      through: "UserLegos",
      foreignKey: "legoId",
    });
  };

  return Lego;
};
