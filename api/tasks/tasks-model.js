const {Schema,model}=require('mongoose')

<<<<<<< HEAD
const taskSchema = new Schema({
    id:{type:Number,index:1,unique:true},
    user:{type:String,required:true},
    day:{type:String,enum:['sunday','monday','tuesday','wednsday','thursday','friday','saturday'],required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    takenCaredOff:{type:Boolean,default:false},
    isDeleted:{type:Boolean,default:false}
})

const Task = model('Task',TaskSchema)
=======
const userSchema=new Schema({
    id:{type:Number,index:1,unique:true},
    name:{type:String,required:true},
    password:{type:Number,required:true},
    email:{type:String,required:true},
    availableDay:{type:[String],required:true},
    daysHelpedWith:{type:[Boolean],default:[]},
    isDeleted:{type:Boolean,default:false}
})

const User=model('User',userSchema)
>>>>>>> c7c9c4c9471e533d971fef5ecce36b12d0766ae1

module.exports=User