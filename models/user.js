const mongoose=require("mongoose")
const crypto=require("crypto")

const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageURL:{
        type:String,
        default:"./public/images/default.png"
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }

},{timestamps:true})

userSchema.pre("save",function(next){
    const user=this
    //const salt="someRandomSalt"
    const salt=crypto.randomBytes(16).toString()
    const hashedPassword=crypto.createHmac("sha256",salt).update(user.password).digest("hex")

    this.salt=salt
    this.password=hashedPassword

    next()
})

userSchema.static("matchPassword",async function(email,password){
    const user=await this.findOne({email})  //REMEBER THAT findOne is an ASYNC FUNCTION and ence we have to use AWAIT
    if(!user) throw new Error("User not found")
    const salt=user.salt
    const hashedPassword=user.password

    const userProvidedHash=crypto.createHmac("sha256",salt).update(password).digest("hex")

    if(hashedPassword!==userProvidedHash) throw new Error("Password incorrect")
    return user

})

const User=mongoose.model("user",userSchema)

module.exports=User