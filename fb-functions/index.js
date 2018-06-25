var functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.sendemail = functions.https.onRequest(function (request, response) {
    // var newResp = JSON.stringify(request);
    // response.status(200).send(newResp);
    response.send('ok');
});
