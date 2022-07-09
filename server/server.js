const sendGrid = require('@sendgrid/mail');
const express = require('express'); 
const app = express(); 
const port = 5000; 

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// reqest is input and res is response 
app.get("/get", (req, res) => {
    res.json({ message: "GET request message from express" });
});

app.post("/post", (req, res) => {
    
    //console.log("req.body => " req.body);
    res.json({ message: `SendGrid email sent successfuly to ${message.to}` });

});



// SendGrid API
app.get("/email", (req, res) => {
    
    //console.log("req => " req);
    sendGrid.setApiKey("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");

    const message = {
        to: "bmp713@gmail.com", 
        from: 'bmp713@gmail.com', 
        subject: 'Sending SendGrid API',
        html: `This message was sent from <strong>NodeJS SendGrid API.</strong>`
    }

    //Send email 
    sendGrid.send(message)
        .then((response) => {
            console.log(response[0].statusCode)
        }).catch((error) => {
            console.error("sgMail.send =>", error)
        })

    res.json({ message: `SendGrid email sent successfuly to ${message.to}` });

});

 

