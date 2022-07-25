const express = require('express');
const Post = require('../models/Post');

const router =express.Router();

const post=require("../models/Post");

router.get("/",async (req,res)=>{
    try {
        const data = await Post.find();
        res.json({posts:data});
    }  
    catch (error) {
        req.json({message:error}); 
    }
});



router.post("/", async (req,res)=>{
    const post=new Post(
        {
            title:req.body.title,
            description:req.body.description
        }
    );
    
    try {
        const Saveddata = await post.save();
        res.json(Saveddata);
    } catch (error) {
        console.log(error);
        res.json({message:error});
    }
});


//GET A SPECIFIC POST
router.get("/:postID",async(req,res)=>{
   try {
    const reqPost=await Post.findById(req.params.postID);
    res.json(reqPost);

   } catch (error) {
    res.json({message:error});
   }
});



// DELETE A POST
router.delete("/:postID",async (req,res)=>{
    try {
        console.log("trigger delete");
        const deletedPost= await Post.deleteOne({_id:req.params.postID});
        res.json({"deletedPost":deletedPost});

    } catch (error) {
        res.json({"err":error.toString()});
    }

});


//updation is done via a patch request

router.patch("/:postID",async (req,res)=>{
    try {
        const updatedPost= await Post.updateOne(
            {_id:req.params.postID},
        {
            $set:{
                title:req.body.title
            }
        });
        res.json(updatedPost);
    } catch (error) {
        res.json({"err":error.toString()});
    }
    
});


module.exports=router;