import { DataTypes } from 'sequelize';
import { sequelizeConexion } from "../database/conexion.js";


export const Almuerzos = sequelizeConexion.define('cuenta_almuerzos', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: 'id_almuerzo'
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

// Sincronizar el modelo con la base de datos
Almuerzos.sync();
