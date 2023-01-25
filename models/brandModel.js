const mongoose = require("mongoose");


const brandSchema = new mongoose.Schema(
    {
    name : {
        type: String,
        required: [true , "Brand name required"],
        unique: [true , "Brand name must be unique"],
        minlenght: [3 , "Too short Brand name"],
        maxlenght: [32 , "Too long Brand name"]
    },
    slug : {
        type: String,
        lowercase: true, 
    }, 
    image: String,
    },
    {timestamps : true}
);

module.exports = mongoose.model("Brand", brandSchema);
