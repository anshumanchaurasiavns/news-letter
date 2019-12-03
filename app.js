const express = require( 'express');
const bodyparser=require("body-parser");
const request= require('request');

app=express();

app.use(express.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile( __dirname+"/index.html");
});

app.post("/",function(req,res){
    var email=req.body.email;
    var fname=req.body.fname;
    var contact=req.body.contact;

    console.log(email,fname,contact);

    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                "merge_fields":{
                    FNAME:fname,
                    PHONE:contact
                }
            }
        ]
    };

    var jasondata=JSON.stringify(data);

    var option={
        url:"https://us4.api.mailchimp.com/3.0/lists/4a34909197",
        method:"POST",
        headers:{
            "Authorization":"anshumanchaurasia 9189b4b0277c06ffb05a465f72a7967d-us4"
        },
        body:jasondata
    };

    request(option,function(error,response,body){
        if(error)
            console.log("error in req if");
        else{
            console.log("success"+response.statusCode);
            res.send("success");
        }
    });
});



app.listen(process.env.PORT || 3000,function(){
    console.log("Server has started");
});


// 9189b4b0277c06ffb05a465f72a7967d-us4

//4a34909197