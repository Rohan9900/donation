const express = require("express");
const router = express.Router();
const Reason = require("../modal/reasonschema");
const nodemailer = require("nodemailer");

router.get("/reason", (req, res) => {
    Reason.find({}, (err, user) => {
        if (err) {
            return res.status(500).send({ err: err });
        }
        return res.status(200).send({ user: user });
    });
});

router.post("/reason", (req, res) => {
    Reason.insertMany(
        {
            email: req.body.email,
            reason: req.body.reason,
        },
        (err, user) => {
            if (err) {
                return res.status(500).send({ err: err });
            }
            return res.status(200).send({ user: user });
        }
    );

    mail(
        "charityspirit@gmail.com",
        req.body.email,
        "Regarding donation mail",
        "Your request for funds is successfully send to our team we will review and will contact you shortly\n Your Sincerly\n ABC"
    );
});

router.post("/decline", (req, res) => {
    mail(
        "charityspirit@gmail.com",
        req.body.email,
        "Your donation is not approved",
        "Sorry,\n your funds raised is not approved due to some reason\n regards,\nABC"
    );
});

router.post("/accept", (req, res) => {
    mail(
        "charityspirit@gmail.com",
        req.body.email,
        "Your donation is  approved",
        "Respected Sir/Mam,\n your funds raised is approved you can fill your funds information in following link\n https://docs.google.com/forms/d/e/1FAIpQLScQFB2n-ARfgdh3UvAs3p1jieOUPtiijyz-XCAwky_l7ub0Qg/viewform\n regards,\nABC"
    );
});

async function mail(from, to, subject, text) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'maudie.wolf@ethereal.email',
            pass: 'sj7uZmz4mtPpnBzpfC'
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
    });
}

module.exports = router;
