import { DataTypes } from "sequelize";
import { sequelizeConexion } from "../database/conexion.js";


export const refrigerios = sequelizeConexion.define('refrigerios',{
     id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
     },
     producto:{
        type:DataTypes.STRING,
        allowNull:false,
     },
     cantidad:{
        type:DataTypes.INTEGER,
        allowNull:false,
     },
     fecha:{
       type:DataTypes.DATE,
       allowNull:false,
     },
     descripcion:{
       type:DataTypes.STRING,
       allowNull:false,
     },
     valor_total:{
       type:DataTypes.INTEGER,
       allowNull:false,
     },
     consumido:{
      type: DataTypes.TINYINT, 
      allowNull: true,
     },
     fk_id_login:{
       type:DataTypes.INTEGER,
       allowNull:false,
     }
},{
    timestamps:false
});

// Sincronizar el modelo con la base de datos
refrigerios.sync();
