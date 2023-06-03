const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyparser=require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
//   db = await Contact.find({})
//   module.exports = db;
//   const arr = await Contact.find({ name:"Shreyansh Pandey"});
}

const port = 5000;



// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));// For servering static files
app.use(express.urlencoded());


// PUG SPECIFIC STUFF
app.set('view engine', 'pug');// set the template engine as pug
app.set('views',path.join(__dirname,'views'));// set the view directory

// const docs = async()=>{
//     var db = await Contact.find({});
// };
// docs();

// const docs = JSON.parse(db);
// console.log(docs);
// this.render('contact1.pug',{
//     Contact
// });

// ENDPOINTS
app.get('/',(req,res)=>{
    const params = {};
    res.status(200).render('home.pug',params);
});
app.get('/contact',(req,res)=>{
    const params = {};
    res.status(200).render('contact.pug',params);
});




app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    // documents();
    myData.save().then( async ()=>{
        db = await Contact.find({})
        res.render('contact1.pug',{dbs:db})
    }).catch(()=>{
        res.status(400).send("The item was not saved to the database");
    });
    // res.status(200).render('contact.pug');
});









// START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on ${port}`);
});