const express=require("express")
const router=express.Router()
const User=require("../models/user")
const { models } = require("mongoose")

router.get("/signup",(req,res)=>{
    return res.render("signup",{error:null})
})

router.get("/signin",(req,res)=>{
    return res.render("signin", { error: null }); // Passing error as null initially
});
router.post("/signup",async (req,res)=>{
    
    try{
        const body=req.body
        console.log(body)
        await User.create({
            fullName:body.fullName,
            email:body.email,
            password:body.password,
        })
    
        return res.redirect("/")
    }
    catch(error){
        //handle error if necessary
        console.error(error)
        return res.render("signup",{error:"Oops an error occured, hold tight while we solve this out!"})
    }
})
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.matchPassword(email, password);
        console.log("User: ", user);
        return res.redirect("/");
    } catch (error) {
        // Pass the error message to the template
        return res.render("signin", { error: "Incorrect Email or Password" });
    }
});
router.get("/", (req, res) => {
    return res.render("home", { error: null }); // Passing error as null initially
});



module.exports=router