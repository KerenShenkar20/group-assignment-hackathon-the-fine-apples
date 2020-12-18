const express = require('express');
const  { middlewareTaskId, getAllTasks, getTask , createTask , updateTask, deleteTask, findUserTasks, findMatchingTasks  } = require('./tasks-controller');
let router = express.Router();


//Middlewares
router.use('/api/tasks/:id', middlewareTaskId);


//Routes
router.get('/api/tasks/', getAllTasks)
      .post('/api/tasks/', createTask);
router.get('/api/tasks/:id', getTask)
      .put('/api/tasks/:id', updateTask)
      .delete('/api/tasks/:id', deleteTask);

module.exports = router;