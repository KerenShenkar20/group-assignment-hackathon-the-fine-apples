const {Schema,model}=require('mongoose')

const taskSchema = new Schema({
    id:{type:Number,index:1},
    user:{type:String,required:true},
    day:{type:String,enum:['sunday','monday','tuesday','wednsday','thursday','friday','saturday'],required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    takenCaredOff:{type:Boolean,default:false},
    isDeleted:{type:Boolean,default:false}
})

const Task = model('Task',TaskSchema);

module.exports=Task;