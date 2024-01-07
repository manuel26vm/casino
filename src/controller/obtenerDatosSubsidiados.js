import { Op,literal} from "sequelize";
import { Almuerzos } from "../models/almuerzos.js";
import { format, startOfDay } from 'date-fns';


// funciones encargdas de traer los datos en el perfil admin de las personas subsidiadas

export const obtenerConsumosSubsidiados = async (req, res) => {
    try {
      // Obtén la fecha actual en formato JavaScript
      const fechaActual = new Date();
      const fechaDia = format(fechaActual, 'yyyy-MM-dd');
  
      // Realiza la consulta para obtener los registros de la tabla refrigerios
      const todosLosRefrigerios = await Almuerzos.findAll({
        where: {
          [Op.and]: [
            literal('DATE(fecha) = :fecha'), // Obtener solo la parte de la fecha
            { fk_id_login: { [Op.ne]: 8 } }, // fk_id_login diferente de 8
            { subsidiado: 1 }, // subsidiado igual a 1
            // Otras condiciones si es necesario
          ],
        },
        replacements: { fecha: fechaDia },
      });
  
      // Imprime los resultados
      console.log(todosLosRefrigerios);
      res.send(todosLosRefrigerios);
    } catch (error) {
      console.error('Error al obtener los refrigerios:', error);
      res.status(500).send('Error al obtener los refrigerios');
    }
  };





  //  funcion encargada de trear los datos datos al perfil de admin de las personas que no estan subsidiadas
  //  y han sido cargadas por archivo plano  excel

  export async function obtenerConsumosSinSubsidios(req,res) {
    try {
      // Obtén la fecha actual en formato JavaScript
      const fechaActual = new Date();
      const fechaDia = format(fechaActual, 'yyyy-MM-dd');
  
      // Realiza la consulta para obtener los registros de la tabla refrigerios
      const todosLosRefrigerios = await Almuerzos.findAll({
        where: {
          [Op.and]: [
            literal('DATE(fecha) = :fecha'), // Obtener solo la parte de la fecha
            { fk_id_login: { [Op.ne]: 8 } }, // fk_id_login diferente de 8
            { subsidiado: 0 }, // subsidiado igual a 1
            // Otras condiciones si es necesario
          ],
        },
        replacements: { fecha: fechaDia },
      });
  
      // Imprime los resultados
      console.log(todosLosRefrigerios);
      res.send(todosLosRefrigerios);
    } catch (error) {
      console.error('Error al obtener los refrigerios:', error);
      res.status(500).send('Error al obtener los refrigerios');
    }
  };
  





