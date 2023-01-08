const express = require("express");
/* In the line of code you provided, const express = require("express"), 
the require function is being used to import the Express.js */
const app = express()
/* In the line of code you provided, const app = express(), the express() function is being called to create an instance of an Express.js application.
The app variable is being assigned the value returned by the express() function. This value is an object that represents the Express.js application 
and provides various methods for routing HTTP requests and setting up middleware.
By calling the express() function, you are creating an Express.js application that you can configure and customize to build your web application. */
const mongoose = require("mongoose");
/* Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. 
It provides a straight-forward,schema-based solution to model your application data.
It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
 */
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

const dotenv = require("dotenv");
dotenv.config();
/* dotenv is a zero-dependency module that loads environment variables from a .env file. 
It is commonly used to configure the runtime environment of an application.
The dotenv module exports a single function that takes an options object as an argument.
 This function loads the environment variables from the .env file and adds them to the process.env object.*/
 
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex:true,
    
    
})
.then(()=> console.log("Database connection Succesfull"))
.catch((err)=>console.log(err));
// mongoose.set('strictQuery', true); 
app.use(express.json());
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.listen(8800,() => {
    console.log("backend is running")
});

/* listen(port: number, callback?: () => void): http.Server;
The app.listen() method takes two arguments: a port number and a callback function. The port number specifies the network port that the server should listen on for incoming requests. 
The callback function is executed when the server has started and is listening for requests.
 */


/* update the package.json scripts with start: "nodemon index.js" to use nodemon 
instead of running the same code again and again  */