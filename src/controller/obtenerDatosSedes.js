import { Op,Sequelize,fn, col, literal} from "sequelize";
// import { Almuerzos } from "../models/almuerzos.js";
import { format } from 'date-fns';
import { cargueAlmuerzo } from "../models/cargue_almuerzos.js";




export const datosPlanta = async (req, res) => {
  try {
    const fecha = new Date();
    const fechaSolo = format(fecha, 'yyyy-MM-dd');

    const resultados = await cargueAlmuerzo.findAll({
      attributes: ['id', 'cedula', 'fecha', 'valor', 'subsidiado', 'sede', 'fk_id_login'],
      where: {
        [Op.and]: [
          literal('DATE(fecha) = :fecha'), // Obtener solo la parte de la fecha
          { sede: { [Op.like]: '%planta%' } },
          { fk_id_login: { [Op.ne]: 8 } }, // Condición adicional: fk_id_login diferente de 8
          { consumido: 0 },  // campo consumido igaul a cero me trae los datos que cargan desde admin cargue almuerzos
        ]
      },
      replacements: { fecha: fechaSolo },
    });

    console.log('Resultados:', resultados);
    res.send(resultados);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).send('Error en la consulta');
  }
};



 export const datosCedis = async (req, res) => {
  try {
    const fecha = new Date();
    const fechaSolo = format(fecha, 'yyyy-MM-dd');

    const resultados = await cargueAlmuerzo.findAll({
      attributes: ['id', 'cedula', 'fecha',  'valor','subsidiado', 'sede', 'fk_id_login'],
      where: {
        [Op.and]: [
          literal('DATE(fecha) = :fecha'), // Obtener solo la parte de la fecha
          { sede: { [Op.like]: '%cedi%' } },
          { fk_id_login: { [Op.ne]: 8 } }, // Condición adicional: fk_id_login diferente de 8
          { consumido: 0 },  // campo consumido igaul a cero me trae los datos que cargan desde admin cargue almuerzos
        ]
      },
      replacements: { fecha: fechaSolo },
    });

    console.log('Resultados:', resultados);
    res.send(resultados);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).send('Error en la consulta');
  }
};

