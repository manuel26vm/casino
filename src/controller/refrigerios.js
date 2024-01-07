import { refrigerios } from "../models/refrigerios.js";
import { Op,literal } from 'sequelize';
import { format } from 'date-fns';

export async function datosRefrigerios(req, res) {
    const refrigeriosData = req.body;
    console.log("🚀 ~ file: refrigerios.js:6 ~ datosRefrigerios ~ refrigeriosData:", refrigeriosData)
    
    console.log("Datos de refrigerios:", refrigeriosData);
  
    try {
      // Usar Promise.all para ejecutar todas las operaciones de creación asincrónicas en paralelo
      const results = await Promise.all(refrigeriosData.map(data => refrigerios.create(data)));
  
      res.json({ success: true, results });
    } catch (error) {
      console.error('Error al cargar los refrigerios:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  }


//   export async function obtenerTodosLosRefrigerios(req,res) {
//     try {
//       // Realiza la consulta para obtener todos los registros de la tabla refrigerios
//       const todosLosRefrigerios = await refrigerios.findAll();
  
//       // Imprime los resultados
//       console.log(todosLosRefrigerios);
//       res.send(todosLosRefrigerios)
//     } catch (error) {
//       console.error('Error al obtener los refrigerios:', error);
//     }
//   }



// export async function obtenerTodosLosRefrigerios(req, res) {
//     try {
//       // Obtén la fecha actual en formato JavaScript
//       let fechaActual =new Date();
//       const fechaSinHoras = startOfDay(fechaActual);
  
//       // Realiza la consulta para obtener los registros de la tabla refrigerios
//       const todosLosRefrigerios = await refrigerios.findAll({
//         where: {
//             fecha: {
//               [Op.eq]: fechaSinHoras,
//             },
//           },
//       });
  
//       // Imprime los resultados
//       console.log(todosLosRefrigerios);
//       res.send(todosLosRefrigerios);
//     } catch (error) {
//       console.error('Error al obtener los refrigerios:', error);
//       res.status(500).send('Error al obtener los refrigerios');
//     }
//   }





export const obtenerTodosLosRefrigerios = async (req, res) => {
    try {
      // Obtén la fecha actual en formato JavaScript
      const fechaActual = new Date();
      const fechaSolo = format(fechaActual, 'yyyy-MM-dd');
  
      // Realiza la consulta para obtener los registros de la tabla refrigerios
      const todosLosRefrigerios = await refrigerios.findAll({
        attributes: ['id', 'producto', 'cantidad', [literal('DATE(fecha)'), 'fecha'], 'descripcion', 'valor_total','consumido', 'fk_id_login'],
        where: {
          [Op.and]: [
            literal('DATE(fecha) = :fecha'), // Obtener solo la parte de la fecha
            // Otras condiciones si es necesario
          ],
          consumido:0
        },
        replacements: { fecha: fechaSolo },
      });
  
      // Imprime los resultados
      console.log(todosLosRefrigerios);
      res.send(todosLosRefrigerios);
    } catch (error) {
      console.error('Error al obtener los refrigerios:', error);
      res.status(500).send('Error al obtener los refrigerios');
    }
  };




  export async function confirmarRefrigerio(req, res) {
    console.log(req.body);
    console.log(req.params.id);
    const {consumido}= req.body;
    console.log("🚀 ~ file: refrigerios.js:98 ~ confirmarRefrigerio ~ consumido:", consumido)
    const id = req.params.id;

    try {
      const refrigerioId = await refrigerios.findByPk(id);

     const actualizacion = await refrigerioId.update({consumido:consumido});

     res.status(200).json({ message: "Campo consumido actualizado con éxito", resultado:actualizacion });
    
    } catch (error) {
      console.error(error)
    }
  }



  export const obtenerTodosLosRefrigeriosAdmin = async (req, res) => {
    try {
      // Obtén la fecha actual en formato JavaScript
      const fechaActual = new Date();
      const fechaSolo = format(fechaActual, 'yyyy-MM-dd');
  
      // Realiza la consulta para obtener los registros de la tabla refrigerios
      const todosLosRefrigerios = await refrigerios.findAll({
        attributes: ['id', 'producto', 'cantidad', [literal('DATE(fecha)'), 'fecha'], 'descripcion', 'valor_total','consumido', 'fk_id_login'],
        where: {
          [Op.and]: [
            literal('DATE(fecha) = :fecha'), // Obtener solo la parte de la fecha
            // Otras condiciones si es necesario
          ],
         
        },
        replacements: { fecha: fechaSolo },
      });
  
      // Imprime los resultados
      console.log(todosLosRefrigerios);
      res.send(todosLosRefrigerios);
    } catch (error) {
      console.error('Error al obtener los refrigerios:', error);
      res.status(500).send('Error al obtener los refrigerios');
    }
  };



  export async function registroId(req, res) {
    console.log(req.params.id);
  const id =req.params.id
    try {
      const registroId= await refrigerios.findByPk(id);
      if (!registroId) {
        res.status(404).json({ error: "No se encontró un registro con el id proporcionado" });
      }

      
      res.json(registroId);
    } catch (error) {
      console.error(error)
    }
   
  }

  export async function eliminarRefrigerio(req,res) {
     const id = req.params.id
     console.log("🚀 ~ file: refrigerios.js:167 ~ eliminarRegistro ~ id:", id)
     try {
      // Eliminar el registro directamente
      const resultado = await refrigerios.destroy({
        where: { id: id }
      });
  
      if (resultado === 0) {
        return res.status(404).json({ message: 'Registro no encontrado' });
      }
  
      res.status(200).json({ message: 'Registro eliminado con éxito', id: id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }