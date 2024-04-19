const express = require("express");
const server=express();
const mongoose=require("mongoose");
const mongo_url = "mongodb://localhost:27017/School_Management_System"
const cors = require('cors');
const port = 3003;
server.use(express.json())
server.use(cors());
const multer = require("multer")
const fs = require("fs");
const path = require('path');
const { log } = require("console");


server.use(express.static(path.join(__dirname, "public")));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix =Date.now();
        cb(null, uniqueSuffix +file.originalname);
    }
});
const upload = multer({ storage: storage });


const userSchema = new mongoose.Schema({
    School_name: { type: String, required: true },
    School_fees: { type: Number, required: true},
    basic_details: { type: String, required: true },
    image: { type: String, required: true },
  });


mongoose.connect(mongo_url)
.then(()=>console.log("mongodb connection established "))
.catch((err)=>console.log(err));

const SchoolModel = mongoose.model("School", userSchema);






server.post("/",upload.single('image'),(req,res)=>{
    try{

        const imagename = `http://localhost:3003/uploads/${req.file.filename}`;
       

        let {School_name,School_fees,basic_details} = req.body;
        let School = SchoolModel({School_name,School_fees,basic_details,image:imagename});
        School.save();
        res.json(School);
    }
    catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

server.get("/",async (req,res)=>{
    try{
    let SchoolList = await SchoolModel.find();
    res.send(SchoolList);
    }
    catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
server.get("/:School",async (req,res)=>{
    try{
    let School = req.params.School;
  
    let student = await SchoolModel.findOne({School_name:School});
  
    res.json(student);}
    catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



server.put("/:School",upload.single('image'),async (req,res)=>{
    try{

        const imagename = `http://localhost:3003/uploads/${req.file.filename}`;
        let {School_name,School_fees,basic_details} = req.body;

    let School = req.params.School;
    let existingUser = await SchoolModel.findOne({ School_name: School });
    const previousFileName = existingUser.image.split('/').pop();
    const previousImagePath = path.join(__dirname, './public/uploads', previousFileName);



    let s = await SchoolModel.findOneAndUpdate({School_name:School},{School_name,School_fees,basic_details,image:imagename},{new:true});
    fs.unlink(previousImagePath, (err) => {
        if (err) {
            console.error('Error deleting previous file:', err);
        } else {
            console.log('Previous file deleted successfully');
        }
    });
    res.json(s);
    }
    catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
server.delete("/:School",async (req,res)=>{
    try{
    const School = req.params.School;

    let existingUser = await SchoolModel.findOne({ School_name: School });
    const previousFileName = existingUser.image.split('/').pop();
    const previousImagePath = path.join(__dirname, './public/uploads', previousFileName);
    let s = await SchoolModel.findOneAndDelete( {School_name:School});
    fs.unlink(previousImagePath, (err) => {
        if (err) {
            console.error('Error deleting previous file:', err);
        } else {
            console.log('Previous file deleted successfully');
        }
    });
    if(s != null) res.json(s);
    else res.status(404).send("No such student found");
    }
    catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



server.get("/filter/sort", async (req, res) => {
    try {
        let limit = parseInt(req.query.sort)||1;//http://localhost:3003/filter/sort?sort=-1
        let sortAsc = await SchoolModel.find().sort({ School_fees: limit });
        res.send(sortAsc);
    } catch (error) {
        console.error('Error sorting schools:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
server.get("/filter/fee/",async (req,res)=>{
    try{
    let min=req.query.min ||0 //http://localhost:3003/filter/fee?min=10000&max=30000
    let max=req.query.max||500000
    let student = await SchoolModel.find({School_fees:{$gte:min,$lte:max}})
    res.send(student);
    }
    catch (error) {
        console.error('Error  :', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})








server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});