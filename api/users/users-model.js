const {Schema,model}=require('mongoose')

const userSchema=new Schema({
    id:{type:Number,index:1},
    name:{type:String,required:true},
    password:{type:Number,required:true},
    email:{type:String,required:true},
    availableDay:{type:[String],required:true},
    daysHelpedWith:{type:[String],default:[]},
    isDeleted:{type:Boolean,default:false}
})

const User = model('User',userSchema)

module.exports = User;