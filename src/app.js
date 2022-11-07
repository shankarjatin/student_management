const express = require("express");
const app = express();
const Student = require("./models/students");
const port = process.env.PORT || 9000;
const mongoose = require ("mongoose");
const DB = "mongodb://localhost:27017/student_management1";

app.use(express.static('public'));
app.use(express.json());

app.use(express.urlencoded({extended:false}));

mongoose.connect(DB).then(()=>{
    console.log("connection successful");
}).catch((err) => console.log("connection failed") );

app.get("/students" ,(req,res)=>{
    res.sendFile(__dirname + "/models/index.html");
 
})


app.post("/students" , (req,res)=>{
    
    const student_data = new Student({
        name: req.body.name,
        student_number: req.body.student_number,
        roll_no: req.body.roll_number,
        branch: req.body.branch,
        city: req.body.city,
        CGPA: req.body.cgpa
    });
   student_data.save().then(()=>{
   res.send(student_data); 
   }).catch((e)=>{
    res.send(e);
   })
})


// app.post("/students" , (req,res)=>{
//     console.log(req.body);
//     const student_data = new Student(req.body);
//    student_data.save().then(()=>{
//    res.send(student_data);
//    }).catch((e)=>{
//     res.send(e);
//    })
// })


app.get("/studentsData" ,async(req,res)=>{
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

app.put("/student/:roll_no", async(req,res)=>{
    let data = await Student.updateOne(
        req.params,
        {
            $set:req.body
        }
    );
    res.send(data);
})





 app.delete("/students",  async(req,res) =>{
    try{
       
       const delete_student =  await Student.deleteMany();

        res.send(delete_student);
       }
    catch(e){
res.status(500).send(e);
    }
})




app.delete("/student/:roll_no",  async(req,res) =>{
    try{
        const _id =req.params.roll_no;
       const delete_student =  await Student.deleteOne({roll_no: _id});
       if(!req.params.roll_no){
        return res.status(400).send();
       }
       else{
        res.send(delete_student);
       }
    }catch(e){
res.status(500).send(e);
    }
})
 app.get("/students/toppers" , async(req,res)=>{
    try{
        const result = await Student.find().sort({CGPA:-1});
        res.send(result);
        console.log(result);
        
    }catch(e){
        res.send(e);
    }
 })
 app.get("/students/bottomers" , async(req,res)=>{
    try{
        const result = await Student.find().sort({CGPA:1});
        res.send(result);
        console.log(result);
        
    }catch(e){
        res.send(e);
    }
 })

app.listen(port , ()=>{console.log("server is up");});