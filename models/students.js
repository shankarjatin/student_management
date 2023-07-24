const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({

    name: {
        type:String,
        required:true,
        minlenght:3
          },
      student_number: {
        type:Number,
        required:true
      },
      roll_no: {
        type:Number,
        required:true 
      },

      branch: {
        type:String,
        required:true,
    },
  
      city: {
        type:String,
        required:true
      },

      CGPA:{
        type:Number,
        min:1,
        required:true,
        
      }
  
});

// we will create model

const Student = new mongoose.model('Student', studentSchema);

module.exports = Student;
