const {Model, DataTypes, UUIDV4} = require('sequelize');

class Mood extends Model{};

module.exports= (sequelize) => {
    return Mood.init(
        {
            
            name:{
                type: DataTypes.STRING,
                unique: true,
            }
        },
        {sequelize, tableName: 'Mood', timestamps: false},
    )
}

/* id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: UUIDV4,
                unique: true,
            }, */