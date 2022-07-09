
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const port = 5000; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.listen(port, () => { 
    console.log('Server listening on port', port) 
});


// GET request
app.get("/", (req, res) => {
});


// GET request
app.get("/users", (req, res) => {
});


// POST email to SendGrid API
app.post("/email", (req, res) => {
    console.log("req.body =>", req.body);

    const sendGrid = require('@sendgrid/mail');

    const message = {
        to: req.body.email, 
        from: 'bmp713@gmail.com', 
        subject: req.body.subject,
        html: req.body.message
    }

    //Send email 
    sendGrid.send(message)
        .then((response) => {
            console.log(response[0].statusCode);
            console.log(`Email sent to ${message.to}`);
        }).catch((error) => {
            console.error("sgMail.send =>", error)
        })

});







 

