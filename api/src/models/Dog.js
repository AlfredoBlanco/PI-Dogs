const {Model, DataTypes, UUIDV4} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

class Dog extends Model{}

module.exports = (sequelize) => {
  // defino el modelo
  return Dog.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
        unique: true,
        allowNull: false,
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      years: {
        type: DataTypes.STRING,
        defaultValue: 'No especificado'
        
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: 'Image Not Found'
      }
    },
    {sequelize, tableName: 'Dog', timestamps: false}
  )
};
