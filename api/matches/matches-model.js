const { match } = require('assert')
const { Schema ,model }=require('mongoose')

const matchSchema=new Schema({
    task:{type:String,required:true},
    toWho:{type:String,required:true},
    fromWho:{type:String,required:true},
    isDeleted:{type:Boolean,default:false}
})

const Match = model('Match',matchSchema);

module.exports = Match;