const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.sapo.pt",
    auth: {
        user: 'votesystemipca@sapo.pt',
        pass: 'votesystemipca1'
    },
});


exports.sendEmail = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    }

    const data = {
        to: req.body.to,
        title: req.body.title, 
        md5: req.body.md5, 
    };

    const mailData = {
        from: 'votesystemipca@sapo.pt',
        to: data.to,
        subject: data.title,
        text: "teste",
        html: 'data.title',
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
};