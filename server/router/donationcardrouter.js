const express = require("express");
const router = express.Router();
const DonationInfo = require("../modal/donationcardschema");
const cloudinary = require("cloudinary");
const Razorpay = require("razorpay");
var request = require("request");


router.get("/donation", (req, res) => {
    DonationInfo.find({}, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err });
        }
        return res.status(200).send({ user: user });
    });
});

router.get("/donation/:id", (req, res) => {
    DonationInfo.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err });
        }
        return res.status(200).send({ user: user });
    });
});

router.post("/donation", (req, res) => {
    cloudinary.v2.config({
        cloud_name: "student12345",
        api_key: "936717671138891",
        api_secret: "aDh235AJlOVY1_2n8b4KVtNlryE",
    });


    let uploadeResponse = cloudinary.v2.uploader.upload(
        req.body.image,
        function (error, result) {
            if(error){
                console.log(error);
                return res.status(500).send(error);
            }
            DonationInfo.insertMany(
                {
                    image: result.url,
                    title: req.body.title,
                    name: req.body.name,
                    totalfunds: req.body.totalfund,
                    fundgather: req.body.fundgather,
                    days: req.body.days,
                    description: req.body.description,
                    donates: [],
                },
                (err, user) => {
                    if (err) {
                        return res.status(500).send({ err: err });
                    }
                    return res.status(200).send({ user: user });
                }
            );
            
        }
    );
});

router.post("/donationamount", async (req, res) => {
    try {
        let donate = await DonationInfo.findOne({ _id: req.body.id });
        if (donate) {
            donate.donates.push({
                name: req.body.name,
                amount: req.body.amount,
            });
          donate.fundgather=parseInt(donate.fundgather) +parseInt(req.body.amount);
        }
        donate = await donate.save();
        return res.status(200).send(donate);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});


const instance = new Razorpay({
    key_id: "rzp_test_V9McTPCQ0fi6X7",
    key_secret: "R3n6qAABuX0cJn0vLOyZo8XX",
  });
  
  router.get("/payment/:amt", (req, res) => {
    try {
      const options = {
        amount: req.params.amt * 100, // amount == Rs 10
        currency: 'INR',
        receipt: "receipt#1",
        payment_capture: 0,
        // 1 for automatic capture // 0 for manual capture
      };
      instance.orders.create(options, async function (err, order) {
        if (err) {
          return res.status(500).json({
            message: "Something Went Wrong",
          });
        }
        return res.status(200).json(order);
      });
    } catch (err) {
      return res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  });
  
  router.post("/capture/:paymentId", (req, res) => {
    try {
      return request(
        {
          method: "POST",
          url: `https://rzp_test_V9McTPCQ0fi6X7:R3n6qAABuX0cJn0vLOyZo8XX@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
          form: {
            amount: req.body.amt * 100, // amount == Rs 10 // Same As Order amount
            currency: 'INR',
          },
        },
        async function (err, response, body) {
          if (err) {
            return res.status(500).json({
              message: "Something Went Wrong",
            });
          }
  
          return res.status(200).json({ body: body, success: true });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  });

module.exports = router;
