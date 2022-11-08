const router = require('express').Router();

router.get('/', (req, res) => {
   res.json('GET') ;
});

router.post('/', (req, res) => {
    res.json('POST') ;
 });

 router.put('/:inmuebleId', (req, res) => {
    res.json('PUT') ;
 });

 router.delete('/:inmuebleId', (req, res) => {
    res.json('DELETE') ;
 });

module.exports = router;