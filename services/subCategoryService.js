const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategory = require("../models/subCategoryModel");
const apiError = require("../utils/apiError");


exports.setCategoryIdToBody = (req, res, next)=>{
    if(!req.body.category) req.body.category = req.params.categoryId;
    next();
};

exports.createSubCategory = asyncHandler(async(req, res)=>{
    

    const {name, category} = req.body;
    const subCategory = await SubCategory.create({name, slug: slugify(name), category});
    res.status(201).json({data: subCategory});
});

exports.createFilterObj =(req, res, next)=>{
    let filterObject ={};
    if(req.params.categoryId) filterObject = {category: req.params.categoryId};
    req.filterObj = filterObject;
    next();

};

exports.getSubCategories = asyncHandler(async(req,res)=>{
    const page = req.query.page * 1 || 1 ;
    const limit = req.query.limit * 1 || 5
    const skip = (page -1) * limit;

    

    const subCategories = await SubCategory.find(req.filterObj)
    .skip(skip).limit(limit)
    .populate({path : "category", select : "name-_id"});
    res.status(200).json({results : subCategories.length , page , data : subCategories});
});

exports.getSubCategory = asyncHandler(async(req, res, next)=>{
    const { id }  = req.params;
    const subCategory = await SubCategory.findById(id).populate({path : "category", select : "name-_id"});
    if (!subCategory){
     return next(new apiError(`no subcategory for this id ${id}`,404));
    }
    res.status(200).json({data : subCategory});

});

exports.updateSubCategory = asyncHandler(async(req, res, next)=>{
    const { id }  = req.params;
    const { name , category } = req.body;
    const subCategory = await SubCategory.findOneAndUpdate(
        {_id: id},
        {name: name, slug: slugify(name), category},
        {new: true}
        );

    if (!subCategory){
        return next(new apiError(`no subCategory for this id ${id}`,404));
      }
      res.status(200).json({data : subCategory});
});

exports.deleteSubCategory = asyncHandler(async(req, res, next)=>{
    const { id }  = req.params;
    const subCategory = await SubCategory.findByIdAndDelete(id);

    if (!subCategory){
        return next(new apiError(`no subCategory for this id ${id}`,404));  
      }
      res.status(204).send();

});