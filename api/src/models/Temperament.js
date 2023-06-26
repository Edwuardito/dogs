const { DataTypes, Sequelize } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('Temperament',{
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
  },{
    timestamps: false
  })
}