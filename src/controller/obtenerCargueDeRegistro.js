import { Op } from "sequelize";
import { Almuerzos } from "../models/almuerzos.js";
import { cargueAlmuerzo } from "../models/cargue_almuerzos.js";




export async function obtenerCargueRegistroUsuario(req,res){
     console.log(req.body)

     try {
        const { id } = req.body;
    
        // Consulta en la base de datos usando Sequelize
        const almuerzos = await cargueAlmuerzo.findAll({
          where: {
            fk_id_login: id,
          },
        });
    
        // Devuelve los resultados como JSON
        res.json({ results: almuerzos });
      } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
      }
}
