const { check } = require("express-validator");
const validatorMidleware = require("../../middlewares/validatorMidleware");

exports.getSubCategoryValidator = [
    check("id").isMongoId().withMessage("invalid subcategory id format"),
    validatorMidleware,
];

exports.createSubCategoryValidator =[
    check("name")
    .notEmpty()
    .withMessage("subcategory required")
    .isLength({min : 2})
    .withMessage("too short subcategory name")
    .isLength({max:32})
    .withMessage("too long subcategory name"),
    check("category")
    .notEmpty()
    .withMessage("subcategory must belong to a category")
    .isMongoId()
    .withMessage("invalid category id format"),
    validatorMidleware,
];

exports.updateSubCategoryValidator =[
    check("id").isMongoId().withMessage("invalid subcategory id format"),
    validatorMidleware,

];

exports.deleteSubCategoryValidator =[
    check("id").isMongoId().withMessage("invalid subcategory id format"),
    validatorMidleware,

];