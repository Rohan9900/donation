const mongoose = require("mongoose");


const donatedby = mongoose.Schema(
    {
      name:{
          type:String
      },
      amount:{
          type:Number
      }
    },
    {
      timestamps: true,
    }
  );

const donationinfo = mongoose.Schema({
    title:{
        type:String
    },
    image:{
        type:String
    },
    name:{
        type:String
    },
    totalfunds:{
        type:String
    },
    fundgather:{
        type:String,
        default:0
    },
    
    days:{
        type:Number
    },
    description:{
        type:String
    },
    donates:[donatedby]

},
{
  timestamps: true,
});
const model = mongoose.model("DonationInfo", donationinfo);
module.exports = model;
