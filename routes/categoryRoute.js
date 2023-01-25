const express = require("express");
const {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
 } = require("../services/categoryservices");
 const { getCategoryValidator,
         createCategoryValidator,
        updateCategoryValidator,
        deleteCategoryValidator } = require("../utils/validators/categoryValidator");

const router = express.Router();

const subcategoriesRoute = require("./subCategoryRoute");
        


router.use("/:categoryId/subcategories", subcategoriesRoute);

router
    .route("/")
    .post(createCategoryValidator,createCategory)
    .get(getCategories);
router.route("/:id")
    .get(getCategoryValidator, getCategory)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;