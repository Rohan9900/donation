var express = require("express");
const router = express.Router();
const Banner = require("../modal/bannerschema");
const cloudinary = require('cloudinary');

//----------------------------------------------------post makaj cart api------------------------------------------------------------------------
router.post("/banner", async (req, res) => {
    cloudinary.v2.config({
        cloud_name: "student12345",
        api_key: "936717671138891",
        api_secret: "aDh235AJlOVY1_2n8b4KVtNlryE",
    });


    let uploadeResponse = cloudinary.v2.uploader.upload(
        req.body.image,
        function (error, result) {
            Banner.insertMany({
                image:result.url,
                title:req.body.title
            },
            (err, user) => {
                if (err) {
                  console.log(err);
                  return res.status(500).send({ err: err });
                }
                return res.status(200).send(user);
              })
        })

});
//get address--------------------------------------------------------------------------------------------------------------
router.get("/banner", (req, res) => {
    Banner.find({}, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err });
        }
        return res.status(200).send({ user: user });
    });
});
module.exports = router;
