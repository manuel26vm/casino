import { Subsidios } from "../models/subsidios.js";






export async function createSubsidies(req, res) {
    console.log(req.body)
      const almuerzos =req.body
      console.log("almuerzos datos:", almuerzos)
  
      //const almuerzosDatos = JSON.parse(almuerzos) // Supongamos que req.body es un arreglo de objetos
        
      try {
        // Usar Promise.all para ejecutar todas las operaciones de creación asincrónicas en paralelo
        const results = await Promise.all(almuerzos.map(almuerzo => Subsidios.create(almuerzo)));
  
        res.json({ success: true, results });
      } catch (error) {
        console.error('Error al cargar los almuerzos:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
      }
    }