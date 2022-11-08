const router = require('express').Router();

const Inmueble = require('../../models/inmueble.model');

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