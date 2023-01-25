const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name:{
        type : String,
        trim : true,
        unique : [true, "subcategory must be unique"],
        minlenght : [2, "subcategory name is too short"],
        maxlenght : [32, "subcategory name is too long"],
    }, 
    slug:{
        type : String, 
        lowercase : true, 
    }, 
    category :{
        type : mongoose.Schema.ObjectId,
        ref: "Category", 
        required : [true, "subcategory must belong to parent category"], 
    },
},
    { timestamps : true, 
    },
);

module.exports = mongoose.model("SubCategory", subCategorySchema);