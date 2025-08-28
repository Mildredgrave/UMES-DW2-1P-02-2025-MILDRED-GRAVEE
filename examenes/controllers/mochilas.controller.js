import { responseSuccess, responseError } from '../helpers/response.helper.js';
import { getDb } from '../configs/mongodb.config.js';
import Joi from 'joi';

// validación con Joi
const mochilaSchema = Joi.object({
  id: Joi.number().required(),
  nombreAlumno: Joi.string().required(),
  precio: Joi.number().min(100).max(1000).required(),
  capacidadLb: Joi.number().min(10).max(20).required(),
  alturaCm: Joi.number().min(25).max(50).optional(),
  material: Joi.string().required()
});

// Handler metodo GET
const getMochilasHandler = async (req, res) => {
  try {
    const db = getDb();
    const mochilas = await db.collection('mochilas').find().toArray();
    
    if (!mochilas || mochilas.length === 0) {
      return res.status(404).json(responseError("No se encontraron mochilas"));
    }

    const response = responseSuccess("Datos obtenidos exitosamente", mochilas);
    res.status(200).json(response);

  } catch (error) {
    console.error(error);
    return res.status(500).json(responseError("Error interno del servidor"));
  }
};

// Handler metodo POST
const postMochilaHandler = async (req, res) => {
  try {
    const db = getDb();
    const newMochila = req.body;

    // Validacion de datoss
    if (!newMochila || Object.keys(newMochila).length === 0) {
      return res.status(400).json(responseError("Datos de la mochila no proporcionados"));
    }

    // Validación con Joi
    const { error } = mochilaSchema.validate(newMochila);
    if (error) {
      return res.status(400).json(responseError(error.details[0].message));
    }

    // Valida si ya existe una mochila con el mismo id
    const existingMochila = await db.collection('mochilas').findOne({ id: newMochila.id });
    if (existingMochila) {
      return res.status(409).json(responseError("Ya existe una mochila con este ID"));
    }

    // Insertar nueva mochila
    const result = await db.collection('mochilas').insertOne(newMochila);
    if (!result.insertedId) {
      return res.status(500).json(responseError("No se pudo crear la mochila"));
    }

    const response = responseSuccess("Mochila creada exitosamente", { id: result.insertedId, ...newMochila });
    res.status(201).json(response);

  } catch (error) {
    console.error(error);
    return res.status(500).json(responseError("Error interno del servidor"));
  }
};

export { getMochilasHandler, 
  postMochilaHandler 
};
