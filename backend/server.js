import path from 'path';
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import products from './data/product.js'
import connectDB from "./config/db.js";
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import { notfound, errorHandler } from "./middlewares/errorMiddleware.js";
dotenv.config()
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// cookie parser middleware
app.use(cookieParser());



app.get('/' , (req,res) =>{
    res.send("API is running");
} );
app.use('/api/products' ,productRoute );
app.use('/api/users' ,userRoute );
app.use('/api/orders' ,orderRoute );
app.use('/api/upload' ,uploadRoute);

const __dirname = path.resolve();
app.use("/uploads" , express.static(path.join(__dirname , '/uploads')));
app.use(notfound);
app.use(errorHandler);




app.listen(PORT ,() => console.log("server is running on port :" ,PORT));