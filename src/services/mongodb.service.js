
const { MongoClient } = require("mongodb");

const uri = process.env.URI_MONGODB;

const client = new MongoClient(uri);

const conectarDB = async () => {
  await client.connect();
  let DB = client.db(process.env.DB_MONGODB)
  return DB;
}

const consultarDocumentos = async (nombreColeccion, filtro) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  filtro = filtro ? filtro : {}
  // Retorna solamente cierto número de Airbnb´s para que no sea muy pesada la consulta
  return coleccion.find(filtro).limit(parseInt(process.env.DEFAULT_LIMIT_PROPERTIES)).toArray()
}

const consultarTipoDocumentos = async (nombreColeccion) => {
  let db = await conectarDB()
  // Se usa la propiedad $group para agrupar los registros
  let pipeline = [{ $group: { _id: "$property_type" } }]
  let coleccion = db.collection(nombreColeccion).aggregate(pipeline)
  return coleccion.toArray()
}

const consultarReviewsDocumentos = async (nombreColeccion) => {
  let db = await conectarDB()
  // El orden de los resultados se muestra de manera descendente para el capo ´number_of_reviews´
  let sort = { number_of_reviews: -1 }
  // Se declaran los campos requeridos para llamar de la base de datos
  let projection = { _id: 0, name: 1, beds: 1, number_of_reviews: 1, price: 1 }
  let coleccion = db.collection(nombreColeccion)
  return coleccion.find().sort(sort).project(projection).limit(parseInt(process.env.DEFAULT_LIMIT_REVIEWS)).toArray()
}

const consultarDocumentosporCamas = async (nombreColeccion, limite) => {
  let db = await conectarDB()
  // Se define el orden de los resultados de manera descendente según el campo ´beds´
  let sort = { beds: -1 }
  // Se declaran los campos requeridos para llamar de la base de datos
  let projection = { _id: 0, name: 1, beds: 1, number_of_reviews: 1, price: 1 }
  let coleccion = db.collection(nombreColeccion)
  return coleccion.find().sort(sort).project(projection).limit(parseInt(limite)).toArray()
}

module.exports = {
  consultarDocumentos,
  consultarTipoDocumentos,
  consultarReviewsDocumentos,
  consultarDocumentosporCamas
}