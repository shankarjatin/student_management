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
      const students_data = await Student.find();
      res.send(students_data);
    }catch(e){
        res.status(400).send(e);
    }
})
app.get("/student/:roll_no" , async(req,res)=>{
    try{
        const _id = req.params.roll_no;
        const student_data1 = await Student.find({roll_no: _id});
        console.log(student_data1);
        if(!student_data1){
            return res.status(404).send();
        }else{
            res.send(student_data1)
        }
    }catch(e){
        res.send(e);
    }
})

 app.patch("/student/:roll_no" , async(req,res) => {
    try{
        const _id = req.params.roll_no;
        const updateData = await Student.findOneAndUpdate({roll_no: _id}, req.body ,{
            new:true
        });
        res.send(updateData);
    }catch(e){
res.status(400).send();
    }
 })



app.listen(port , ()=>{console.log("server is up");});