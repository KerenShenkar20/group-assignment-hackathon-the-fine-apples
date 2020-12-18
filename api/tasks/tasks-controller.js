const mongoose = require('mongoose');
const logger = require('../../lib/logs');
const config = require('../../config/config-default');
const Task = require('./tasks-model');
const User = require('../users/users-model');
const Match = require('../matches/matches-model');

let message = '';


const middlewareTaskId = async function(req, res, next) {
    try{
        const { id } = req.params;
        const task = await Task.findById({id});
        if(!task){
            message = 'Error - task not exist';
            logger.error(message);
            return res.status(401).json({message});
        }
        else{
            logger.info(`Success - founded the task`);
            next();
        }
    }
    catch(error){
        message = 'Error - Problem find task';
        logger.error(message);
        return res.status(401).json({message});
    }
};

const getAllTasks = async function(req, res){
    try{
        logger.info('getAllTasks');
        const tasks = await Task.find();
        logger.info(`founded ${tasks.length} tasks`);
        return res.status(200).json(tasks);
    }
    catch(error){
        message = 'Error - Failed searching for all tasks';
        logger.error(`${message} + ${error}`);
        return res.status(400).json({message})
    }
};
const getTask = async function(req, res){
    try{
        logger.info('getTask');
        const task = await Task.findById({ id: req.params.id });
        logger.info(task);
        return res.status(200).json({task});
    }
    catch (error) {return res.status(400).json({error});}
};
const createTask = async function(req, res){
    try{
        logger.info('createTask');
        if(!req.body.description || !req.body.day || !req.body.category){
            logger.error('Error - Missing Params - can not complete valis creation without (description & day & category) params');
            return res.status(400).send('Error - Missing Params - can not complete valis creation without (description & day & category) params');
        }
        let newTask = { id: mongoose.Types.ObjectId(), description: req.body.description, day: req.body.day, category: req.body.category  };
        if (req.body.takenCaredOff) task.takenCaredOff = req.body.takenCaredOff;
        const task = await Task.findById({id:newTask.id});
        if(!task){
            newTask.save();
            logger.info(`Success - Created New task ${newTask}`);
            logger.info(newTask);
            return res.status(200).json(newTask);
        }
        else{
            message = 'Error - task already exist';
            logger.error(message);
            return res.status(400).json(message);
        }
    }
    catch(error){
        message = 'Error - Faild Create new Task';
        logger.error(`${message} : ${error}`);
        return res.status(400).json(message);
    }
};
const updateTask = async function(req, res){
    try{
        logger.info('updateTask');
        const task = await Task.findById({ id: req.params.id });
        if (req.body.description) task.description = req.body.description;
        if (req.body.day) task.day = req.body.day;
        if (req.body.category) task.category = req.body.category;
        if (req.body.takenCaredOff) task.takenCaredOff = req.body.takenCaredOff;
        task.update({ id: task.id });
        logger.info(task);
        return res.status(200).json({task});
    }
    catch (error) {return res.status(400).json({error});}
};

const deleteTask = async function(req, res){
    try{
        logger.info('deleteTask');
        const task = await Task.findById({ id: req.params.id });
        if (task.isDeleted == false) task.isDeleted = true;
        Task.update({ id: task.id });
        logger.info(task);
        return res.status(200).json({task});
    }
    catch (error) {return res.status(400).json({error});}
};

const findUserTasks = async function(req, res){
    try{
        const tasks = await User.find({_id: req.params.id})
                                 .populate({path: 'task', model: 'Task', select: 'createdBy'});
        logger.info(tweet);
        return res.status(200).json({message});
    }
    catch(error){
        message = `Error - Faild Search  ${user.user_name} tasks`;
        logger.error(`${message} : ${error}`);
        return res.status(400).json(message);
    }
};

const findMatchingTasks = async function(req,res){
    try{
        const tweets = await User.find({_id: req.params.id})
                                 .populate({path: 'tweet', model: 'Tweet', select: 'createdBy', popluate : {
                                            path: 'follow', model: 'Follow', select: 'followTo'}});
        logger.info(tweet);
        return res.status(200).json({message});
    }
    catch(error){
        message = `Error - Faild Search following of ${user.user_name} Tweets`;
            logger.error(`${message} : ${error}`);
            return res.status(400).json(message);
    }
};

module.exports =  { middlewareTaskId, getAllTasks, getTask , createTask , updateTask, deleteTask, findUserTasks, findMatchingTasks  };

