require("dotenv").config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const port = 5000; 
const app = express(); 

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
    const users = [
        { name: "user 1", email: "steve1@apple.com"},
        { name: "user 2", email: "steve2@apple.com"},
        { name: "user 3", email: "steve3@apple.com"}
    ];
    res.send(users);
});


// GET NY Times top headlines
app.get("/news", async (req, res) => {
    let data;
    try{
        await axios.get(`https://api.nytimes.com/svc/news/v3/content/nyt/all.json?api-key=${process.env.NY_TIMES_API_KEY}`)
            .then((res) => {
                //console.log("res =>", res.data.results[0]);
                data = res.data;
                console.log("data =>", data);
            })
            .catch( err => {
                console.log(err);
            });
    }catch(err){
        console.log(err);
    }
    res.send(data);

});


// POST email to SendGrid API
app.post("/email", (req, res) => {
    console.log("req.body =>", req.body);

    const sendGrid = require('@sendgrid/mail');
    sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

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

 

