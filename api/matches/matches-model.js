const { match } = require('assert')
const {Schema,model}=require('mongoose')

const matchSchema=new Schema({
    id:{type:Number,required:true,unique:true},
    task:{type:Number,required:true},
    toWho:{type:Number,required:true},
    fromWho:{type:Number,required:true},
    isDeleted:{type:Boolean,default:false}
})

const Match=model('Match',matchSchema)

module.exports=Match