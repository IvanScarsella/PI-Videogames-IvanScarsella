const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
    // id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   primaryKey: true,
    //   defaultvalue: UUIDV4
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, { timestamps: false });
};
