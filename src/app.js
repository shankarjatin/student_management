const express = require("express");
const app = express();
const Student = require("./models/students");
const port = process.env.PORT || 9000;
const mongoose = require ("mongoose");
const DB = "mongodb://localhost:27017/student_management1";
app.use(express.json());
mongoose.connect(DB).then(()=>{
    console.log("connection successful");
}).catch((err) => console.log("connection failed") );



app.post("/students" , (req,res)=>{
    console.log(req.body);
    const student_data = new Student(req.body);
   student_data.save().then(()=>{
   res.send(student_data);
   }).catch((e)=>{
    res.send(e);
   })
})
app.get("/students" ,async(req,res)=>{
    try{
      const students_data=  Student.find();
    }catch(e){
        res.status(400).send(e);
    }
})
app.listen(port , ()=>{console.log("server is up");});