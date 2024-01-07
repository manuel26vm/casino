import { DataTypes } from "sequelize";
import { sequelizeConexion } from "../database/conexion.js";


export const Subsidios = sequelizeConexion.define('subsidios_almuerzos',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    cedula:{
        type:DataTypes.INTEGER,
        allowNull:false,   
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    fecha:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    area:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    valor_subsidio:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{
    timestamps:false
})  

// Sincronizar el modelo con la base de datos
Subsidios.sync();
