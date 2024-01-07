import { DataTypes } from "sequelize";
import { sequelizeConexion } from "../database/conexion.js";


export const cargueAlmuerzo =sequelizeConexion.define('cargue_almuerzos',{
    id:{
       type:DataTypes.INTEGER,
       primaryKey:true,
       autoIncrement:true,
       allowNull:false,
    },
    cedula: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    valor: {
        type: DataTypes.INTEGER, // Cambiado a INTEGER según tu requerimiento
        allowNull: true,
    },
    subsidiado: {
        type: DataTypes.TINYINT, 
        allowNull: true,
    },
    consumido: {
        type: DataTypes.TINYINT, 
        allowNull: true,
    },
    sede: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    fk_id_login: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },

},{
    timestamps: false
});


cargueAlmuerzo.sync();