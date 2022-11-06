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
        min:4,
        required:true,
        unique:true
      },
      roll_no: {
        type:Number,
        min:4,
        required:true,
        unique:true
      },

      branch: {
        type:String,
        required:true,
        minlenght:2
    },
  
      city: {
        type:String,
        required:true
      },

      CGPA:{
        type:Number,
        min:2,
        required:true,
        
      }
  
});

// we will create model

const Student = new mongoose.model('Student', studentSchema);

module.exports = Student;
