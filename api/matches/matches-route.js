const express = require('express');
const { middlewareMatchId, getAllMatches, getMatch, createMatch, updateMatch,deleteMatch, findUserMarches   } = require('./matches-controller');
let router = express.Router();


//Middlewares
router.use('/api/matches/:id', middlewareMatchId);

//Routes
router.get('/api/matches/', getAllMatches)
      .post('/api/matches/', createMatch);
router.get('/api/matches/:id', getMatch)
      .put('/api/matches/:id', updateMatch)
      .delete('/api/tmatchessks/:id', deleteMatch);

module.exports = router;