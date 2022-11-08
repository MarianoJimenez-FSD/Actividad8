const router = require('express').Router();

const Inmueble = require('../../models/inmueble.model');


/**
 * @openapi
 * tags:
 *   - name: Inmuebles
 *     description: "Peticiones relacionadas con inmuebles"
 *
 * /api/inmuebles:
 *   get:
 *     tags:
 *       - Inmuebles
 *     description: Devuelve todos los inmuebles.
 *     responses:
 *       200:
 *         description: Una lista de inmuebles.
 *         content: 
 *           application/json: 
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/inmueble'
 *       500:
 *         description: Error que se ha producido en el servidor.
 *         content:
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/error'
 *   post:
 *     tags:
 *       - Inmuebles
 *     description: Inserta el inmueble recibido en el cuerpo de la petición. No deberá enviarse el campo _id.
 *     requestBody:
 *       description: Inmueble a añadir al sistema
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/inmueble'
 *     responses:
 *       200:
 *         description: Objeto con el inmueble dado de alta en el sistema. La respuesta tendrá el campo _id asignado al inmueble.
 *         content: 
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/inmueble'
 *       400:
 *         description: Alguno de los campos enviados es incorrecto.
 *         content: 
 *           application/json: 
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/error'
 *       500:
 *         description: Error que se ha producido en el servidor.
 *         content:
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/error' 
 * /api/inmuebles/{inmuebleId}:
 *   put:
 *     tags:
 *       - Inmuebles
 *     description: Actualiza el inmueble con el id recibido como parámetro, con los campos indicados en el cuerpo de la petición. Solo hará falta indicar los campos que se van a modificar.
 *     parameters:
 *       - $ref: '#/components/parameters/inmuebleId'
 *     requestBody:
 *       description: Inmueble a añadir al sistema
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/inmueble'
 *     responses:
 *       200:
 *         description: Objeto con el inmueble una vez aplicadas las modificaciones.
 *         content: 
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/inmueble'
 *       400:
 *         description: Alguno de los campos enviados es incorrecto.
 *         content: 
 *           application/json: 
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/error'
 *       404:
 *         description: No existe ningún inmueble con el identificador especificado.
 *         content: 
 *           application/json: 
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/error'
 *       500:
 *         description: Error que se ha producido en el servidor.
 *         content:
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/error' 
 *   delete:
 *     tags:
 *       - Inmuebles
 *     description: Borra el inmueble con el id recibido como parámetro.
 *     parameters:
 *       - $ref: '#/components/parameters/inmuebleId' 
 *     responses:
 *       200:
 *         description: Objeto con el inmueble borrado del sistema.
 *         content: 
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/inmueble'
 *       404:
 *         description: No existe ningún inmueble con el identificador especificado.
 *         content: 
 *           application/json: 
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/error'
 *       500:
 *         description: Error que se ha producido en el servidor.
 *         content:
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/error' 
 *components:
 *  parameters:
 *    inmuebleId:
 *      name: inmuebleId
 *      in: path
 *      description: "**Idenfificador asignado al inmueble**. *Ejemplo: 636aa57b2192e490f496f8ff*. Identificador asignado al inmueble en el sistema."
 *      schema:
 *        type: string
 *  schemas: 
 *    inmueble:
 *      title: Inmueble
 *      description: Datos de un inmueble
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: Identificador asignado al inmueble. No hay que indicarlo al dar de alta un inmueble, (el sistema le asignará el identificador automáticamente).
 *          example: 636aa57b2192e490f496f8ff
 *        piso:
 *          type: integer
 *          description: Piso del inmueble. Los valores válidos van del 0 (bajo) al 200.
 *          example: 2
 *        letra:
 *          type: string
 *          description: Letra del inmueble. Será un solo carácter.
 *          example: "C"
 *        extension:
 *          type: integer
 *          description: Metros cuadrados del inmueble.
 *          example: 125
 *        habitaciones:
 *          type: integer
 *          description: Número de habitaciones del inmueble.
 *          example: 4
 *        alquilado:
 *          type: boolean
 *          description: Indica si el inmueble está alquilado o no (true/false).
 *          example: false
 *        propietario:
 *          type: string
 *          description: Propietario del inmueble.
 *          example: "Mariano García Núñez"
 *        email:
 *          type: string
 *          description: Correo electrónico del propietario.
 *          example: "mgarcia@gmail.com"
 *    error:
 *      title: Error
 *      description: Error producido al tratar una petición
 *      type: object
 *      properties:
 *        errorMessage:
 *          type: string
 *          description: Descripción del error que se ha producido
 *          example: "inmueble validation failed: piso: El valor 20.1 del campo piso no es un entero válido" 
 */

router.get('/', async (req, res) => {
   try {
      const inmuebles = await Inmueble.find();
      res.json(inmuebles);
   } catch (error) {
      manageError(res, error);
   }
});

router.post('/', async (req, res) => {
   try {
      const inmueble = await Inmueble.create(req.body);
      res.json(inmueble);
   } catch (error) {
      manageError(res, error);
   }
});

router.put('/:inmuebleId', async (req, res) => {   
   try {
      const { inmuebleId } = req.params;
      const inmueble = await Inmueble.findByIdAndUpdate(inmuebleId, req.body, { new: true });
      checkExits(res, inmueble);
   } catch (error) {
      manageError(res, error);
   }
 });

 router.delete('/:inmuebleId', async (req, res) => {
   try {
      const { inmuebleId } = req.params;
      const inmueble = await Inmueble.findByIdAndDelete(inmuebleId);
      checkExits(res, inmueble);
   } catch (error) {
      manageError(res, error);
   }
 });

const checkExits = (res, inmueble) => {
   if (inmueble) {
      res.json(inmueble);
   } else {
      res.status(404)
         .json({ errorMessage: 'No existe un inmueble con ese Id' });
   }
}

const manageError = (res, error) => {
   let statusCode;
   if (error.name === "ValidationError") {
      statusCode = 400;
   } else {
      console.log(error); // --> Habría que volcarlo a fichero de log.
      statusCode =  500;
   }

   res.status(statusCode)
      .json({ errorMessage: error.message });
}

module.exports = router;