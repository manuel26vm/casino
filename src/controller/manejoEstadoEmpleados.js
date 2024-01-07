import { Empleados } from "../models/empleados.js";

export async function inhabilitarEmpleado(req,res) {
    const {id}=req.body
    console.log(id)
    try {
        // Buscar el empleado por su ID
        const empleado = await Empleados.findByPk(id);
    
        // Verificar si el empleado existe
        if (empleado) {
          // Actualizar el campo activo a 0
          await empleado.update({ activo: 0 });
    
          console.log(`Empleado con ID ${id} inactivado exitosamente.`);
          res.json({ success: true, message: `Empleado inactivado exitosamente.` });
        } else {
          console.log(`No se encontró ningún empleado con ID ${id}.`);
          res.status(404).json({ success: false, message: `No se encontró ningún empleado con ID ${id}.` });
        }
      } catch (error) {
        console.error('Error al inactivar el empleado:', error.message);
        res.status(500).json({ success: false, message: 'Error al inactivar el empleado.' });
      }
}


export async function habilitarEmpleado(req,res) {
  const {id}=req.body
  console.log(id)
  try {
      // Buscar el empleado por su ID
      const empleado = await Empleados.findByPk(id);
  
      // Verificar si el empleado existe
      if (empleado) {
        // Actualizar el campo activo a 0
        await empleado.update({ activo: 1 });
  
        console.log(`Empleado con ID ${id} inactivado exitosamente.`);
        res.json({ success: true, message: `Empleado activado exitosamente` });
      } else {
        console.log(`No se encontró ningún empleado con ID ${id}.`);
        res.status(404).json({ success: false, message: `No se encontró ningún empleado con ID ${id}.` });
      }
    } catch (error) {
      console.error('Error al inactivar el empleado:', error.message);
      res.status(500).json({ success: false, message: 'Error al inactivar el empleado.' });
    }


}