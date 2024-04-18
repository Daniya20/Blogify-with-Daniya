const express=require("express")
const router=express.Router()// initialize router
const Blog=require("../models/blog")
//const Comment=require("../models/comment")
const Comment=require("../models/comment")
const multer=require("multer")
const path=require("path")



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/images/uploads`))
    },
    filename: function (req, file, cb) {
      const fileName=`${Date.now()}-${file.originalname}`
      cb(null,fileName)
    }
  })
  
  const upload = multer({ storage: storage })

router.get("/add-new",(req,res)=>{
    res.render("addBlog",{user:req.user,error:null})
})

router.get("/:id",async (req,res)=>{
    const blog=await Blog.findById(req.params.id).populate("createdBy")
    const comments=await Comment.find({blogId:req.params.id}).populate("createdBy")
    console.log(comments)
    console.log("blog",blog)
    return res.render("blog",{
        //user:user.req,
        error:null,
        blog,
        comments,
    })
})

router.post("/comment/:blogId",async(req,res)=>{
    await Comment.create({
        content:req.body.content,
        blogId:req.params.blogId,
        //createdBy:req.user._id,
    });
    return res.redirect(`/blogs/${req.params.blogId}`)
})


router.post("/",upload.single('coverImage'),async(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    const body=req.body
    const blog= await Blog.create({
        body:body.body,
        title:body.title,
        coverImageURL:`/uploads/${req.file.filename}`
    })
    return res.redirect(`/blogs/${blog._id}`)
})

module.exports=router   //export router