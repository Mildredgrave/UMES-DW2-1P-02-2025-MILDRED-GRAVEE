import { responseSuccess, responseError } from '../helpers/response.helper.js';
import { getDb } from '../configs/mongodb.config.js';

//Handler para el metodo get de todos los clientes
const getMochilasHandler = async (req, res) => {
  try{
    const db = getDb();
    const clientes = await db.collection('mochilas').find().toArray();
    
    if (!clientes)
      return res.status(404).json(responseError("No se encontro Datos"));

    const response = responseSuccess("Datos obtenidos exitosamente",clientes);

    res.status(200).json(response);
  }catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }

}

// Handler para el metodo POST de una nueva mochila
const createMochilaHandler = async (req, res) => {
  try {
    const db = getDb();
    const newMochila = req.body; 

    if (!newMochila || Object.keys(newMochila).length === 0) {
      return res.status(400).json(responseError("Datos de la mochila no proporcionados"));
    }

    const result = await db.collection('mochilas').insertOne(newMochila);

    if (!result.acknowledged) {
      return res.status(500).json(responseError("No se pudo crear la mochila"));
    }

    const response = responseSuccess("Mochila creada exitosamente", { id: result.insertedId, ...newMochila });

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}

export { 
  createMochilaHandler
};



export { 
  getMochilasHandler
};