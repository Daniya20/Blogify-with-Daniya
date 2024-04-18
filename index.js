const path=require("path")
const mongoose=require("mongoose")
const Blog=require("./models/blog")// to render blogs on home page which are stored in the blog obj in the blog.js schema of models
const express=require("express")
const app=express()
//middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.resolve("./public/images")))
app.use(express.static(path.resolve("./public")))


//setting our views engine as ejs and resolving/providing our path for the views folder(taake usko pata chaley k humaare views k liye konsa folder use krna hai)
app.set("view engine","ejs")    
app.set("views",path.resolve("./views"))

//handling routes
const userRoute=require("./routes/user")  //1st step: Register the routes of ur application
const blogRoute=require("./routes/blog")
app.use("/users",userRoute) //2nd step: mapping matlb k agr users pr ek req aayi toh usko userRoute handle krrega
app.use("/blogs",blogRoute)

app.get("/", async(req, res) => {
    const allBlogs=await Blog.find({})
    return res.render("home", { error: null, blogs:allBlogs }); // Passing error as null initially we did this to handle the error while in signin
});



//mongodb
mongoose.connect("mongodb://localhost:27017/DaniyaBlogs").then(()=>{console.log("mongo connected HURRAYY!!")})


const PORT=8001
app.listen(PORT,()=>{console.log(`server is listening on port...${PORT}`)})