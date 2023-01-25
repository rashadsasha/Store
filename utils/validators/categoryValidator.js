const { check } = require("express-validator");
const validatorMidleware = require("../../middlewares/validatorMidleware");

exports.getCategoryValidator = [
    check("id").isMongoId().withMessage("invalid category id format"),
    validatorMidleware,
]

exports.createCategoryValidator =[
    check("name")
    .notEmpty().withMessage("category required")
    .isLength({min : 3}).withMessage("too short category name")
    .isLength({max:32}).withMessage("too long category name"),
    validatorMidleware,
]

exports.updateCategoryValidator =[
    check("id").isMongoId().withMessage("invalid category id format"),
    validatorMidleware,

]

exports.deleteCategoryValidator =[
    check("id").isMongoId().withMessage("invalid category id format"),
    validatorMidleware,

]