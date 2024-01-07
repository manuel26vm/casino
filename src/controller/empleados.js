import { json } from "express";
import { Empleados } from "../models/empleados.js";




export async function  getEmployees(req,res){    
        try {
          const data = await Empleados.findAll({
            where: {
              activo: 1,
            },
          });
      
          res.json(data);
        } catch (error) {
          console.error('Error al recuperar los empleados:', error);
          res.status(500).send('Error interno del servidor');
        }
    
 }

 export async function createEmployees(req, res) {
     console.log('WTF',req.body) 

    try {
      const { cedula, nombre,clave, fecha_ingreso,activo,tipo_cargue,centro_costos} = req.body;

      if (!cedula|| !nombre|| !clave|| !fecha_ingreso|| !activo|| !tipo_cargue|| !centro_costos) {
        res.json({message:'completa los datos '})
        return
      }
      console.log(cedula,nombre,fecha_ingreso,activo,tipo_cargue,centro_costos);
  
     // Insertar en la base de datos usando Sequelize

      //esta insercion de dato esta para que me llegue solo un usuario 
      const nuevoUsuario = await Empleados.create({
        cedula,
        nombre,
        clave,
        fecha_ingreso,
        activo,
        tipo_cargue,
        centro_costos,
      });
  
     res.json({ success: true, nuevoUsuario });
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  }




  // actualizar empleados 

//   export async function updateEmployees(req,res) {
//     const idEmpleado = req.params.id;

//     console.log(req.body)
//     console.log(req.body.clave )
    

//     try {
//       // Encuentra el empleado por ID
//       const empleado = await Empleados.findByPk(idEmpleado);
  
//       if (!empleado) {
//         return res.status(404).json({ error: 'Empleado no encontrado' });
//       }

//       if (req.body.cedula && req.body.cedula !== empleado.cedula) {
//            empleado.cedula = req.body.cedula
//       }
  
//       // Actualiza los campos
//       empleado.cedula = req.body.cedula || empleado.cedula;
//       empleado.nombre = req.body.nombre || empleado.nombre;
//       empleado.clave = req.body.clave || empleado.clave;
//       // empleado.activo = req.body.activo || empleado.activo;
//       empleado.tipo_cargue = req.body.tipo_cargue || empleado.tipo_cargue;
//       empleado.centro_costos = req.body.centro_costos || empleado.centro_costos;
  
//       // Guarda los cambios
//       await empleado.save();
  
//       // Devuelve solo las propiedades necesarias del objeto actualizado
//       const empleadoActualizado = {
//         id: empleado.id,
//         cedula: empleado.cedula,
//         nombre: empleado.nombre,
//         fecha_ingreso: empleado.fecha_ingreso,
//         activo: empleado.activo,
//         tipo_cargue: empleado.tipo_cargue,
//         centro_costos: empleado.centro_costos,
//       };
  
//       // Responde con el empleado actualizado
//       res.json(empleadoActualizado);
//     } catch (error) {
//       console.error('Error al actualizar empleado:', error);
//       res.status(500).json({ error: 'Error interno del servidor' });
//     }
     
//   }





export async function updateEmployees(req, res) {
  const idEmpleado = req.params.id;

  try {
    // Encuentra el empleado por ID
    const empleado = await Empleados.findByPk(idEmpleado);

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    // Actualiza los campos solo si hay cambios
    if (req.body.cedula !== empleado.cedula) {
      empleado.cedula = req.body.cedula;
    }

    if (req.body.nombre) {
      empleado.nombre = req.body.nombre;
    }

    if (req.body.clave) {
      empleado.clave = req.body.clave;
    }

    if (req.body.tipo_cargue) {
      empleado.tipo_cargue = req.body.tipo_cargue;
    }

    if (req.body.centro_costos) {
      empleado.centro_costos = req.body.centro_costos;
    }

    // Guarda los cambios solo si hay algo para actualizar
    if (empleado.changed()) {
      await empleado.save();
    }

    // Devuelve solo las propiedades necesarias del objeto actualizado
    const empleadoActualizado = {
      id: empleado.id, 
      cedula: empleado.cedula,
      nombre: empleado.nombre,
      fecha_ingreso: empleado.fecha_ingreso,
      activo: empleado.activo,
      tipo_cargue: empleado.tipo_cargue,
      centro_costos: empleado.centro_costos,
    };

    // Responde con el empleado actualizado
    res.json(empleadoActualizado);
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}



  
export async function  empleadosInactivos(req,res){    
  try {
    const data = await Empleados.findAll({
      where: {
        activo: 0,
      },
    });

    res.json(data);
  } catch (error) {
    console.error('Error al recuperar los empleados:', error);
    res.status(500).send('Error interno del servidor');
  }

}








export async function datosLogin(req,res) {

    try {
    
      const { cedula, contrasena } = req.body;

      // Buscar empleado por cédula
      const empleado = await Empleados.findOne({ where: { cedula: cedula } });

      if (!empleado) {
        res.status(404).json({ mensaje: "el usuario no existe" });
      return
      }

      console.log('estado del empleado :',empleado.activo)

      // Verificar si el empleado existe y la contraseña coincide
      
       if(empleado && empleado.activo===0){
        res.status(200).json({ mensaje: "usuario inactivo " });
      }else if (empleado && empleado.clave === contrasena ) {
        // Usuario y contraseña válidos
        res.status(200).json({ mensaje: "Inicio de sesión exitoso",resultado:empleado });
      } else {
          // Usuario o contraseña incorrectos
          res.status(401).json({ mensaje: "Cédula o contraseña incorrectos" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error en el servidor" });
  }
}




export async function datosEmpleado(req, res) {
  console.log(req.body)
 try {
   const { id } = req.body; // Suponiendo que el ID se envía en el cuerpo del POST

   // Consulta a la base de datos
   const empleado = await Empleados.findOne({
     where: {
       id: id,
     },
   });

   if (!empleado) {
     return res.status(404).json({ mensaje: 'Empleado no encontrado' });
   }

   // Devolver el empleado encontrado
   return res.status(200).json(empleado);
 } catch (error) {
   console.error('Error al obtener el empleado por ID:', error);
   return res.status(500).json({ mensaje: 'Error interno del servidor' });
 }
}




// export async function datosLogin(req, res) {
//   try {
//     const { cedula, contrasena } = req.body;

//     // Buscar empleado por cédula
//     const empleado = await Empleados.findOne({ where: { cedula: cedula } });

//     console.log('estado del empleado :', empleado ? empleado.activo : 'No encontrado');

//     // Verificar si el empleado existe
//     if (!empleado) {
//       res.status(200).json({ mensaje: "Usuario no encontrado" });
//       return;
//     }

//     // Verificar si el empleado está inactivo
//     if (empleado.activo === 0) {
//       res.status(200).json({ mensaje: "Usuario inactivo" });
//       return;
//     }

//     // Verificar si la contraseña coincide
//     if (empleado.clave === contrasena) {
//       // Usuario y contraseña válidos
//       res.status(200).json({ mensaje: "Inicio de sesión exitoso", resultado: empleado });
//     } else {
//       // Usuario o contraseña incorrectos
//       res.status(401).json({ mensaje: "Cédula o contraseña incorrectos" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error en el servidor" });
//   }
// }

