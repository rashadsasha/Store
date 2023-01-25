const { check } = require("express-validator");
const validatorMidleware = require("../../middlewares/validatorMidleware");

exports.getBrandValidator = [
    check("id").isMongoId().withMessage("invalid Brand id format"),
    validatorMidleware,
]

exports.createBrandValidator =[
    check("name")
    .notEmpty().withMessage("Brand required")
    .isLength({min : 3}).withMessage("too short Brand name")
    .isLength({max:32}).withMessage("too long Brand name"),
    validatorMidleware,
]

exports.updateBrandValidator =[
    check("id").isMongoId().withMessage("invalid Brand id format"),
    validatorMidleware,

]

exports.deleteBrandValidator =[
    check("id").isMongoId().withMessage("invalid Brand id format"),
    validatorMidleware,

]