const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    platform: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    image: {
      type: DataTypes.STRING
    },
    release: {
      type: DataTypes.DATEONLY
    },
    rating: {
      type: DataTypes.FLOAT,
      min: 1,
      max: 5,
      allowNull: false
    }
  });
};
