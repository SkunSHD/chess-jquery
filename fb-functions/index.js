var functions = require('firebase-functions');
var nodemailer = require('nodemailer');

// CORS Express middleware to enable CORS Requests.
var cors = require('cors')({
    origin: true
});


// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
var gmailEmail = 'chess.lessons.kiev@gmail.com';
var gmailPassword = 'j2oox892';

var mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

function sendWelcomeEmail(messageData) {
    var mailOptions = {
        from: '<noreply@chess-lessons-kiev.firebaseapp.com>',
        to: 'verachern@mail.ru'
    };

    mailOptions.subject = 'Сообщение от:' + messageData.contact;
    mailOptions.text = messageData.message;

    return mailTransport.sendMail(mailOptions).then(function () {
        // console.log('New email sent ok!');
    }).catch(function (err) {
        console.log('mailTransport err!', err);
    });
}


// functions
exports.sendemail = functions.https.onRequest(function (req, res) {
    cors(req, res, function() {
        sendWelcomeEmail(req.body);
        res.status(200).send(req.body);
    });
});
