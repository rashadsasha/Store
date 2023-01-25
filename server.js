const express = require("express");
const dotenv = require("dotenv");
dotenv.config({path : "config.env"});
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware")
dbConnection();

const app = express();
 app.use(express.json());

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
    console.log(`mode : ${process.env.NODE_ENV}`);
}


app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);

app.all("*", (req, res,next) =>{
    next(new ApiError(`can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>{
    console.log(`app is running on port ${PORT}`);
});

process.on("unhandledRejection",(err)=>{
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(()=>{
        console.error(`Shutting down....`);
        process.exit(1);

    });
});