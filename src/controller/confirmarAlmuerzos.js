import { cargueAlmuerzo} from "../models/cargue_almuerzos.js";

// export async function cargueAlmuerzosPorId(req,res) {
//    const id =req.params.subsidioId;
//    console.log("🚀 ~ file: confirmarAlmuerzos.js:5 ~ cargueAlmuerzosPorId ~ id:", id)

   
//     try {
//         const  datos =cargueAlmuerzo.findAll({
//             where:{
//                 id:id
//             }
//         })
        
//     } catch (error) {
        
//     }
// }





export async function cargueAlmuerzosPorId(req, res) {
    const id = req.params.consumoId;
    console.log("🚀 ~ file: confirmarAlmuerzos.js:5 ~ cargueAlmuerzosPorId ~ id:", id);

    try {
        const datos = await cargueAlmuerzo.findAll({
            where: {
                id: id
            }
        });

        // Envía los datos al cliente en formato JSON
        res.json(datos);
    } catch (error) {
        console.error("Error al obtener datos de cargueAlmuerzo:", error);
        res.status(500).json({ error: "Error al obtener datos de cargueAlmuerzo" });
    }
}




export async function confirmarAlmuerzosPlanta(req, res) {
  const id = req.params.id;
  console.log(
    "🚀 ~ file: confirmarAlmuerzos.js:49 ~ confirmarAlmuerzosPlanta ~ id:",
    id
  );
  const { consumido } = req.body;
  console.log(
    "🚀 ~ file: confirmarAlmuerzos.js:50 ~ confirmarAlmuerzo ~ consumido:",
    consumido
  );

  try {
    // Buscar el registro por ID
    const registro = await cargueAlmuerzo.findByPk(id);

    if (!registro) {
      console.log(`No se encontró un registro con el id ${id}`);
      return res
        .status(404)
        .json({ error: "No se encontró un registro con el id proporcionado" });
    }

    // Actualizar el campo consumido
    const actualizacion = await registro.update({ consumido: consumido });
    console.log("🚀 ~ file: confirmarAlmuerzos.js:71 ~ confirmarAlmuerzo ~ actualizacion:", actualizacion)
    // if (actualizacion.consumido===1) {
    //     res.send({ message: 'el estado ya es consumido' })
    // }

    console.log(`Campo consumido actualizado con éxito para el id ${id}`);
    res.status(200).json({ message: "Campo consumido actualizado con éxito", resultado:actualizacion });
  } catch (error) {
    console.error("Error al actualizar el campo consumido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}


export async function confirmarAlmuerzo(req, res) {
  const id = req.params.id;
  console.log(
    "🚀 ~ file: confirmarAlmuerzos.js:49 ~ confirmarAlmuerzo ~ id:",
    id
  );
  const { consumido } = req.body;
  console.log(
    "🚀 ~ file: confirmarAlmuerzos.js:50 ~ confirmarAlmuerzo ~ consumido:",
    consumido
  );

  try {
    // Buscar el registro por ID
    const registro = await cargueAlmuerzo.findByPk(id);

    if (!registro) {
      console.log(`No se encontró un registro con el id ${id}`);
      return res
        .status(404)
        .json({ error: "No se encontró un registro con el id proporcionado" });
    }

    // Actualizar el campo consumido
    const actualizacion = await registro.update({ consumido: consumido });
    console.log("🚀 ~ file: confirmarAlmuerzos.js:71 ~ confirmarAlmuerzo ~ actualizacion:", actualizacion)
    // if (actualizacion.consumido===1) {
    //     res.send({ message: 'el estado ya es consumido' })
    // }

    console.log(`Campo consumido actualizado con éxito para el id ${id}`);
    res.status(200).json({ message: "Campo consumido actualizado con éxito", resultado:actualizacion });
  } catch (error) {
    console.error("Error al actualizar el campo consumido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}




export async function cargueAlmuerzosPlantaPorId(req,res) {
  const id = req.params.consumoId;
  console.log("🚀 ~ file: confirmarAlmuerzos.js:5 ~ cargueAlmuerzosPorId ~ id:", id);

  try {
      const datos = await cargueAlmuerzo.findAll({
          where: {
              id: id
          }
      });

      // Envía los datos al cliente en formato JSON
      res.json(datos);
  } catch (error) {
      console.error("Error al obtener datos de cargueAlmuerzo:", error);
      res.status(500).json({ error: "Error al obtener datos de cargueAlmuerzo" });
  }
}

export async  function consultarEstadoConsumido(req,res){
   console.log(req.params.id)
   const id = req.params.id
   try {
    
    const registros = await cargueAlmuerzo.findByPk(id)

    if (!registros) {
      return res.status(404).json({error:'registro no encontrado'})
    }

  console.log(registros)
  res.json(registros)

   } catch (error) {
    console.error(error)
    res.status(500).json({error:'error en el servidor'})
   }

}

  

export async function eliminarAlmuerzoId (req,res){
  console.log('este es el id que se eliminara',req.params.id)
  const id = req.params.id
  try {
    const registroAEliminar = await cargueAlmuerzo.findByPk(id);

    if (!registroAEliminar) {
        return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await registroAEliminar.destroy();

    res.json({ mensaje: 'Registro eliminado exitosamente' });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
}
}  
  