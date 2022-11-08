const router = require('express').Router();

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Actividad 8',
      description: 'Actividad: Diseño de API con base de datos MongoDB. Máster full stack devoloper. UNIR.',
      version: '1.0.0',
    },
  },
  apis: ['./routes/api/*.js']
};

const swaggerSpec  = swaggerJsdoc(options);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec ));

module.exports = router;