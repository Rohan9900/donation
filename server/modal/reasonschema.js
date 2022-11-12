const mongoose = require("mongoose");


const reason = mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    reason:{
        type:String
    },
    isverify:{
        type:Boolean,
        default:false
    }
},
{
    timestamps: true,
  });
const model = mongoose.model("Reason", reason);
module.exports = model;
