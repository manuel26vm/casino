 import { Router } from "express";

 //controllers
import { getAlmuerzos, createlunches, insertarCuentaAlmuerzos, insertarCuentaAlmuerzosPlanta, cargarAlmuerzo } from "../controller/almuerzos.js";
import { getEmployees,createEmployees,updateEmployees, empleadosInactivos, datosLogin,datosEmpleado } from "../controller/empleados.js";
import { createSubsidies } from "../controller/subsidios.js";
import { datosPlanta,datosCedis } from "../controller/obtenerDatosSedes.js";
import { confirmarRefrigerio, datosRefrigerios,eliminarRefrigerio,obtenerTodosLosRefrigerios, obtenerTodosLosRefrigeriosAdmin, registroId} from "../controller/refrigerios.js";
import { obtenerConsumosSinSubsidios, obtenerConsumosSubsidiados } from "../controller/obtenerDatosSubsidiados.js";
import { FechasCargue, FechasComsumoSinSubsidios, FechasComsumosSubsidiados,FechasRefrigerios,filtroFechas } from "../controller/fltroFechas.js";
import { obtenerCargueRegistroUsuario } from "../controller/obtenerCargueDeRegistro.js";
import { habilitarEmpleado, inhabilitarEmpleado } from "../controller/manejoEstadoEmpleados.js";
import { cargueAlmuerzosPlantaPorId, cargueAlmuerzosPorId, confirmarAlmuerzo, confirmarAlmuerzosPlanta, consultarEstadoConsumido, eliminarAlmuerzoId} from "../controller/confirmarAlmuerzos.js";



const router = Router();


// routes almuerzos
router.get('/almuerzos',getAlmuerzos);
router.post('/almuerzos',createlunches);
router.post('/insertarAlmuerzos',insertarCuentaAlmuerzos);
router.post('/insertarAlmuerzosPlanta',insertarCuentaAlmuerzosPlanta);

// routes empleados
router.get('/empleados',getEmployees);
router.post('/empleados',createEmployees); 
router.put('/empleados/:id',updateEmployees);
router.post('/empleadoDatos',datosEmpleado);

//  routes subsidios almuerzos 
router.get('/subsidios',datosPlanta)
router.post('/subsidios',createSubsidies);
router.get('/almuerzosCedis',datosCedis);
router.get('/subsidiosAdmin',obtenerConsumosSubsidiados);
router.get('/consumosSinSubsidio',obtenerConsumosSinSubsidios);

// routes refrigerios 
router.post('/refrigerios',datosRefrigerios);
router.get('/refrigerios',obtenerTodosLosRefrigerios);
router.put('/confirmarRefrigerio/:id',confirmarRefrigerio);
router.get('/refrigeriosAdmin',obtenerTodosLosRefrigeriosAdmin);
router.get('/registroId/:id',registroId);
router.get('/eliminarRefrigerio/:id',eliminarRefrigerio);

//routes fecha
router.post('/filtroFechas',filtroFechas);
router.post('/filtroFechasRefrigerios',FechasRefrigerios)
router.post('/filtroConsumosSubsidiados',FechasComsumosSubsidiados);
router.post('/filtroConsumosSinSubsidios',FechasComsumoSinSubsidios);
router.post('/fitroCargues',FechasCargue);  

//routes registro cargue
router.post('/registroDeCargues',obtenerCargueRegistroUsuario)

//routes empleados inactivos
router.get('/inactivos',empleadosInactivos);

// routes estado empleados
router.post('/inhabilitarEmpleado',inhabilitarEmpleado)
router.post('/habilitarEmpleado',habilitarEmpleado);

//routes confirmar almuerzo admincasino
router.get('/confirmarAlmuerzo/:consumoId',cargueAlmuerzosPorId);
router.put('/confirmarAlmuerzo/:id',confirmarAlmuerzo);

router.get('/confirmarAlmuerzoPlanta/:consumoId',cargueAlmuerzosPlantaPorId);
router.put('/confirmarAlmuerzoPlanta/:id',confirmarAlmuerzosPlanta);

//routes obtener registro consumido
router.get('/consultarConsumoAdmin/:id',consultarEstadoConsumido);

// routes eliminar almuerzo 
router.delete('/eliminarAlmuerzo/:id',eliminarAlmuerzoId);


//routes enviar datos login
router.post('/enviarDatos',datosLogin);
router.post('/cargueAlmuerzoRespaldo',cargarAlmuerzo);

   

export default router;
