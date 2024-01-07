import { Op } from "sequelize";
import { Almuerzos } from "../models/almuerzos.js";
import { cargueAlmuerzo } from "../models/cargue_almuerzos.js";






export async function  getAlmuerzos (req,res){
      const fechaActual = new Date();
    
      const fechaMenosCincoMeses = new Date(fechaActual);
      fechaMenosCincoMeses.setMonth(fechaMenosCincoMeses.getMonth() - 5);

    try {
      const data = await Almuerzos.findAll({
        where: {
          fecha: {
            [Op.between]: [fechaMenosCincoMeses, fechaActual],
          },
          subsidiado: 0, // Agrega esta condición para filtrar por subsidio igual a 0
        },
        order: [['fecha', 'DESC']],
      });
      
    
        res.json(data);
      } catch (error) {
        console.error('Error al recuperar los almuerzos:', error);
        res.status(500).send('Error interno del servidor');
      }
 }



 // esta funcion manda los registros a la tabla cargue_almuerzos

  export async function createlunches(req, res) {
  //console.log(req.body)
    const almuerzos =req.body
    console.log("almuerzos datos:", almuerzos)

    //const almuerzosDatos = JSON.parse(almuerzos) // Supongamos que req.body es un arreglo de objetos
    
      
    try {
      // Usar Promise.all para ejecutar todas las operaciones de creación asincrónicas en paralelo
      const results = await Promise.all(almuerzos.map(almuerzo => cargueAlmuerzo.create(almuerzo)));

      res.json({ success: true, results });
    } catch (error) {
      console.error('Error al cargar los almuerzos:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  }



  // export async function insertarCuentaAlmuerzos(req,res) {
 
  //  const datosParaCargarAlaTablaCargueAlmuerzo=req.body

  //  console.log("🚀 ~ file: almuerzos.js:63 ~ insertarCuentaAlmuerzos ~ datosParaCargarAlaTablaCargueAlmuerzo:", datosParaCargarAlaTablaCargueAlmuerzo)
   
  //  res.json({mesasge:'esta llegando la solicitud '})
  // }

  export async function insertarCuentaAlmuerzos(req, res) {
    try {
      const datosParaCargarAlaTablaCargueAlmuerzo = req.body;
      
      // Elimina la propiedad 'consumido' si no existe en la tabla Almuerzo
      delete datosParaCargarAlaTablaCargueAlmuerzo.consumido;
  
      // Insertar datos en la tabla Almuerzo
      const nuevoAlmuerzo = await Almuerzos.create(datosParaCargarAlaTablaCargueAlmuerzo);
      
      console.log("Almuerzo insertado:", nuevoAlmuerzo);
  
      res.json({ message: 'Datos insertados correctamente' });
    } catch (error) {
      console.error("Error al insertar almuerzo:", error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }

  
  export async function insertarCuentaAlmuerzosPlanta(req, res) {
    try {
      const datosParaCargarAlaTablaCargueAlmuerzo = req.body;
      
      // Elimina la propiedad 'consumido' si no existe en la tabla Almuerzo
      delete datosParaCargarAlaTablaCargueAlmuerzo.consumido;
  
      // Insertar datos en la tabla Almuerzo
      const nuevoAlmuerzo = await Almuerzos.create(datosParaCargarAlaTablaCargueAlmuerzo);
      
      console.log("Almuerzo insertado:", nuevoAlmuerzo);
  
      res.json({ message: 'Datos insertados correctamente' });
    } catch (error) {
      console.error("Error al insertar almuerzo:", error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }


  export async function cargarAlmuerzo(req, res) {
    try {
      console.log(req.body);
      const datos = req.body[0];
      const cedula = datos.cedula;

      const fecha = new Date();
      const offset = fecha.getTimezoneOffset(); // Obtener el desfase horario en minutos
      const fechaLocal = new Date(fecha.getTime() - offset * 60000); // Restar el desfase para obtener la hora local

      const formatoFecha = fechaLocal.toISOString().split("T")[0];
      console.log(formatoFecha);

      const valor = datos.valor;
      const subsidiado = datos.subsidiado;
      const sede = datos.sede;
      const fk_id_login = datos.fk_id_login;

      const nuevoAlmuerzo = await Almuerzos.create({
        cedula: cedula,
        fecha: formatoFecha,
        valor: valor,
        subsidiado: subsidiado,
        sede: sede,
        fk_id_login: fk_id_login,
      });

      console.log(
        "🚀 ~ file: almuerzos.js:128 ~ cargarAlmuerzo ~ nuevoAlmuerzo:",
        nuevoAlmuerzo
      );

      // Respondemos con el nuevo registro creado
      res
        .status(201)
        .json({
          message: "Registro de almuerzo creado con éxito",
          almuerzo: nuevoAlmuerzo,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  }