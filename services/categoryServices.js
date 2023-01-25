const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const apiError = require("../utils/apiError");

exports.getCategories = asyncHandler(async(req,res)=>{
    const page = req.query.page * 1 || 1 ;
    const limit = req.query.limit * 1 || 5
    const skip = (page -1) * limit;
    const categories = await Category.find({}).skip(skip).limit(limit);
    res.status(200).json({results : categories.length , page , data : categories});
});

exports.getCategory = asyncHandler(async(req, res, next)=>{
    const { id }  = req.params;
    const category = await Category.findById(id);
    if (!category){
     return next(new apiError(`no category for this id ${id}`,404));
    }
    res.status(200).json({data : category});

});

exports.createCategory = asyncHandler(async(req, res)=>{
    const {name} = req.body;

    const category = await Category.create({name, slug: slugify(name)});
    res.status(201).json({data: category});
});

exports.updateCategory = asyncHandler(async(req, res, next)=>{
    const { id }  = req.params;
    const { name } = req.body;
    const category = await Category.findOneAndUpdate(
        {_id: id},
        {name: name, slug: slugify(name)},
        {new: true}
        );

    if (!category){
        return next(new apiError(`no category for this id ${id}`,404));
      }
      res.status(200).json({data : category});
});

exports.deleteCategory = asyncHandler(async(req, res, next)=>{
    const { id }  = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category){
        return next(new apiError(`no category for this id ${id}`,404));  
      }
      res.status(204).send();

});