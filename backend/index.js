const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const dbConnect=require("./db")
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send("hellow world");
});

//routes
app.use('/api',require('./routes/getCarLogosRoute')); //carlogos route
app.use('/api',require('./routes/getHomeCarouselRoute')); //home carousel images route
app.use('/api',require('./routes/getCarCarouselDetailRoute')); //car carousel images route
app.use('/api',require('./routes/getHomeService')); //service images route
app.use('/api',require('./routes/getCarAccessoriesRoute')); //service images route
app.use('/api',require('./routes/getEBrochureRoute')); //service images route
app.use('/api',require('./routes/getPriceListingRoute')); //car price data route

app.listen(port,(req,res)=>{
    console.log(`hans hyundai server running successfully on port number ${port}`)
});
