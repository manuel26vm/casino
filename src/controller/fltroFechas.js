import { Almuerzos } from "../models/almuerzos.js";
import { Op } from "sequelize";
import { cargueAlmuerzo } from "../models/cargue_almuerzos.js";
import { refrigerios } from "../models/refrigerios.js";






// export async function FechasComsumosSubsidiados(req, res) {
//     console.log(req.body);
//     const { fechaInicioInput, fechaFinInput } = req.body;
//     try {
//                    const fechaInicio = new Date(fechaInicioInput);
//                const fechaFin = new Date(fechaFinInput);
  
//       console.log(fechaInicio, fechaFin);
  
//       // Agregamos un día a la fecha de fin para buscar hasta el final del día
//       fechaFin.setDate(fechaFin.getDate() + 1);
  
//       const resultados = await Almuerzos.findAll({
//         where: {
//           fecha: {
//             [Op.between]: [fechaInicio, fechaFin],
//           },
//         },
//         order: [["fecha", "DESC"]],
//       });
  
//       res.send(resultados);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: "Error en el servidor" });
//     }
//   }


export async function FechasComsumosSubsidiados(req, res) {
  console.log(req.body);
  const { fechaInicioInput, fechaFinInput } = req.body;
  try {
    const fechaInicio = new Date(fechaInicioInput);
    const fechaFin = new Date(fechaFinInput);

    console.log(fechaInicio, fechaFin);

    // Agregamos un día a la fecha de fin para buscar hasta el final del día
    fechaFin.setDate(fechaFin.getDate() + 1);

    const resultados = await Almuerzos.findAll({
      where: {
        fecha: {
          [Op.between]: [fechaInicio, fechaFin],
        },
        fk_id_login: {
          [Op.ne]: 8,
        },
        subsidiado: 1,
        // Otras condiciones si es necesario
      },
      order: [["fecha", "DESC"]],
    });

    res.send(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error en el servidor" });
  }
};


export async function FechasComsumoSinSubsidios(req, res) {
  console.log(req.body);
  const { fechaInicioInput, fechaFinInput } = req.body;
  try {
    const fechaInicio = new Date(fechaInicioInput);
    const fechaFin = new Date(fechaFinInput);

    console.log(fechaInicio, fechaFin);

    // Agregamos un día a la fecha de fin para buscar hasta el final del día
    fechaFin.setDate(fechaFin.getDate() + 1);

    const resultados = await Almuerzos.findAll({
      where: {
        fecha: {
          [Op.between]: [fechaInicio, fechaFin],
        },
        fk_id_login: {
          [Op.ne]: 8,
        },
        subsidiado: 0,
        // Otras condiciones si es necesario
      },
      order: [["fecha", "DESC"]],
    });

    res.send(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error en el servidor" });
  }
};



  export async function FechasCargue(req, res) {
    console.log(req.body);
    const { fechaInicioInput, fechaFinInput, id } = req.body;


    try {
      // const fechaInicio = new Date(fechaInicioInput);
      // const fechaFin = new Date(fechaFinInput);

      // console.log(fechaInicio, fechaFin);

      // Agregamos un día a la fecha de fin para buscar hasta el final del día
      // fechaFin.setDate(fechaFin.getDate() + 1);
      

      const resultados = await cargueAlmuerzo.findAll({
        where: { 
          fecha: {
            [Op.between]: [fechaInicioInput, fechaFinInput + ' 18:59:59'],
          },
          fk_id_login:id
        },
        order: [["fecha", "DESC"]],
      });

      res.send(resultados);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error en el servidor" });
    }
  }


  export async function FechasRefrigerios(req, res) {
    console.log(req.body);
    const { fechaInicioInput, fechaFinInput } = req.body;
    try {
                   const fechaInicio = new Date(fechaInicioInput);
               const fechaFin = new Date(fechaFinInput);
  
      console.log(fechaInicio, fechaFin);
  
      // Agregamos un día a la fecha de fin para buscar hasta el final del día
      fechaFin.setDate(fechaFin.getDate() + 1);
  
      const resultados = await refrigerios.findAll({
        where: {
          fecha: {
            [Op.between]: [fechaInicio, fechaFin],
          },
        },
        order: [["fecha", "DESC"]],
      });
  
      res.send(resultados);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error en el servidor" });
    }
  }



  export async function filtroFechas(req, res) {
    console.log(req.body);
    const { fechaInicioInput, fechaFinInput } = req.body;
  
    console.log("Fecha de inicio input:", fechaInicioInput);
  console.log("Fecha de fin input:", fechaFinInput);
    try {
      const fechaInicio = new Date(fechaInicioInput);
      const fechaFin = new Date(fechaFinInput);
  
      console.log(fechaInicio,fechaFin)
  
      // Agregamos un día a la fecha de fin para buscar hasta el final del día
      fechaFin.setDate(fechaFin.getDate() + 1);
  
      const resultados = await Almuerzos.findAll({
        where: {
          fecha: {
            [Op.gte]: fechaInicio,
            [Op.lt]: fechaFin,
          },
        },
        order: [['fecha', 'DESC']],
      });
  
      res.send(resultados);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error en el servidor' });
    }
  }