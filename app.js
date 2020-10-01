const express = require('express');
const bodyparser = require("body-parser");
const request = require('request');
require('dotenv').config()

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY

app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    let email = req.body.email;
    let fname = req.body.fname;
    let contact = req.body.contact;

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                "merge_fields": {
                    FNAME: fname,
                    PHONE: contact
                }
            }
        ]
    };

    let jsonData = JSON.stringify(data);

    let option = {
        url: "https://us4.api.mailchimp.com/3.0/lists/4a34909197",
        method: "POST",
        headers: {
            "Authorization": API_KEY
        },
        body: jsonData
    };

    request(option, function (error, response, body) {
        if (error)
            console.log("Something went wrong, Please Try again!");
        else {
            res.send({
                "statusCode": response.statusCode,
                "message": "Sucess!"
            });
        }
    });
});

app.listen(PORT, function () {
    console.log("Server has started on : " + PORT);
});