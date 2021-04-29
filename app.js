const express = require('express'),
      jwt = require('jsonwebtoken'),
      fs = require('fs'),
      app = express();

let publicKey =  fs.readFileSync('./keys/ecdsa_public_key.pem', {encoding:'utf8', flag:'r'});
let privateKey =  fs.readFileSync('./keys/ecdsa_private_key.pem', {encoding:'utf8', flag:'r'});

console.log(privateKey)

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.get('/api/test', verifyToken, (req, res) => {
    
    jwt.verify(req.token, publicKey, {algorithm:  'ES256'},(err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'TEST GET --- ...... ',
                authData
            });
        }
    });

})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, publicKey, {algorithm:  'ES256'},(err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {
   
    const payload = {
        company: "TECO",
        application: 'TECO AGVs multicar',
        email: '__@teco.com.tw',
        companySection : "TGRI"
    }

    jwt.sign({ payload }, privateKey, { algorithm:  'ES256'}, (err, token) => {
        res.json({
            token
        });
    });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

app.listen(5000, () => console.log('Server started on port 5000'));