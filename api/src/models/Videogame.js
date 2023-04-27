const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      allowNull: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    platform: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://www.shutterstock.com/image-vector/video-game-controller-background-gadgets-260nw-1177928209.jpg'
    },
    release: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      min: 1,
      max: 5,
      allowNull: false
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, { timestamps: false });
};
