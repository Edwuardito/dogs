const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image:{
      type:DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    height:{
      type: DataTypes.STRING
    },
    weight:{
      type: DataTypes.STRING
    },
    age:{
      type: DataTypes.STRING
    }
  },{
    timestamps: false
  });
};
