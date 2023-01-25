const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema(
    {
    name : {
        type: String,
        required: [true , "Category name required"],
        unique: [true , "Category name must be unique"],
        minlenght: [3 , "Too short category name"],
        maxlenght: [32 , "Too long category name"]
    },
    slug : {
        type: String,
        lowercase: true, 
    }, 
    image: String,
    },
    {timestamps : true}
);

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;