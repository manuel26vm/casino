import { DataTypes } from 'sequelize';
import { sequelizeConexion } from "../database/conexion.js";

export const Empleados = sequelizeConexion.define('empleados', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  cedula: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_ingreso: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  activo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo_cargue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  centro_costos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

// Sincronizar el modelo con la base de datos
Empleados.sync();
