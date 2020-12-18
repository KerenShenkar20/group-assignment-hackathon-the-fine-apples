const { time } = require('console')
const {Schema,model}=require('mongoose')

const taskSchema=new Schema({
    id:{type:Number,index:1,unique:true},
    day:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    takenCaredOff:{type:Boolean,default:false},
    isDeleted:{type:Boolean,default:false}
})

const task = model('Task',TaskSchema)

module.exports = Task;