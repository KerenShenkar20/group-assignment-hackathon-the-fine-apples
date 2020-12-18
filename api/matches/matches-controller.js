const mongoose = require('mongoose');
const logger = require('../../lib/logs');
const config = require('../../config/config-default');
const Task = require('../tasks/tasks-model');
const User = require('../users/users-model');
const Match = require('../matches/matches-model');

let message = '';


const middlewareMatchId = async function(req, res, next) {
    try{
        const { id } = req.params;
        const match = await Match.findById({id});
        if(!match){
            message = 'Error - Match not exist';
            logger.error(message);
            return res.status(401).json({message});
        }
        else{
            logger.info(`Success - founded the Match`);
            next();
        }
    }
    catch(error){
        message = 'Error - Problem find match';
        logger.error(message);
        return res.status(401).json({message});
    }
};

const getAllMatches = async function(req, res){
    try{
        logger.info('getAllMatches');
        const matches = await Task.find();
        logger.info(`founded ${tasks.length} matches`);
        return res.status(200).json(matches);
    }
    catch(error){
        message = 'Error - Failed searching for all matches';
        logger.error(`${message} + ${error}`);
        return res.status(400).json({message})
    }
};
const getMatch = async function(req, res){
    try{
        logger.info('getMatch');
        const match = await Match.findById({ id: req.params.id });
        logger.info(match);
        return res.status(200).json({match});
    }
    catch (error) {return res.status(400).json({error});}
};
const createMatch = async function(req, res){
    
    try{
        logger.info('createMatch');
        if(!req.body.task || !req.body.toWho || !req.body.fromWho){
            logger.error('Error - Missing Params - can not complete valis creation without (task & toWho & fromWho) params');
            return res.status(400).send('Error - Missing Params - can not complete valis creation without (task & toWho & fromWho) params');
        }
        let newMatch = { id: mongoose.Types.ObjectId(), task: req.body.task, toWho: req.body.toWho, fromWho: req.body.fromWho  };
        const match = await Match.findById({id:newMatch.id});
        if(!match){
            newMatch.save();
            logger.info(`Success - Created New match ${newMatch}`);
            logger.info(newTask);
            return res.status(200).json(newMatch);
        }
        else{
            message = 'Error - match already exist';
            logger.error(message);
            return res.status(400).json(message);
        }
    }
    catch(error){
        message = 'Error - Faild Create new match';
        logger.error(`${message} : ${error}`);
        return res.status(400).json(message);
    }
};

const updateMatch = async function(req, res){
    try{
        logger.info('updateMatch');
        const match = await Match.findById({ id: req.params.id });
        if (req.body.task) task.task = req.body.task;
        if (req.body.toWho) task.toWho = req.body.toWho;
        if (req.body.fromWho) task.fromWho = req.body.fromWho;
        task.update({ id: match.id });
        logger.info(match);
        return res.status(200).json({match});
    }
    catch (error) {return res.status(400).json({error});}
};

const deleteMatch = async function(req, res){
    try{
        logger.info('deleteMatch');
        const match = await Match.findById({ id: req.params.id });
        if (task.isDeleted == false) task.isDeleted = true;
        Task.update({ id: match.id });
        logger.info(match);
        return res.status(200).json({match});
    }
    catch (error) {return res.status(400).json({error});}
};

const findUserMarches = async function(req, res){
    try{
        const matches = await User.find({_id: req.params.id})
                                 .populate({path: 'match', model: 'Match', select: 'fromWho'});
        logger.info(matches);
        return res.status(200).json({message});
    }
    catch(error){
        message = `Error - Faild Search  ${user.user_name} matches`;
        logger.error(`${message} : ${error}`);
        return res.status(400).json(message);
    }
};


module.exports =  { middlewareMatchId, getAllMatches, getMatch, createMatch, updateMatch,deleteMatch, findUserMarches   };

