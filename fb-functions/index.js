var functions = require('firebase-functions');

// CORS Express middleware to enable CORS Requests.
var cors = require('cors')({
    origin: true
});

// functions
exports.sendemail = functions.https.onRequest(function (req, res) {
    console.log("----|> req.body", req.body)
    return cors(req, res, function() {
        res.status(200).send(req.body);
    });
});
