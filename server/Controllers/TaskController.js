const Task=require("../Models/Task");
const User=require("../Models/User")


const getTask=async(req,res)=>{
    try{
        const {userId}=req.user;
        // console.log(userId);
        const tasks=await Task.find({author:userId});
        if(!tasks)
        {
            return res.status(201).send("No task Found");
        }
        else
        {
            return res.status(200).json(tasks);
        }
    }catch(err){
        console.log(err);
        return res.status(500).send("Something went wrong.Please try again.")
    }
}

const AddTask=async(req,res)=>{
    try{
        const {content,isCompleted}=req.body;
        const {userId}=req.user;
        // console.log("aaya");
        const task=await Task.create({
            author:userId,
            content,
            isCompleted,
        })
        const user=await User.findById(userId);
        user.tasks.push(task._id);
        await user.save();
        return res.status(200).json(task);

    }catch(err)
    {
        console.log(err);
        return res.status(500).send("Something went wrong.Please try again.")
    }
}

const UpdateTask=async(req,res)=>{
    try{
        const {id,content}=req.body;
        const task=await Task.findById(id);
        task.content=content;
        await task.save();
        return res.status(200).send("Successfully updated")
    }catch(err)
    {
        console.log(err);
        return res.status(500).send("Something went wrong.Please try again.")
    }
    

}

const DeleteTask=async(req,res)=>{
    try{
        const {id}=req.body;
        const {userId}=req.user;
        const task=await Task.findByIdAndDelete(id);
        const user=await User.findById(userId);
        user.tasks=user.tasks.filter(tasks=>tasks!=id)
        await user.save();
        return res.status(201).send("Task Deleted");
    }catch(err)
    {
        console.log(err);
        return res.status(500).send("Something went wrong.Please try again.")
    }
}

const CompleteTask=async(req,res)=>{
    try{
        const {id}=req.body;
        const task=await Task.findById(id);
        task.isCompleted=!task.isCompleted;
        await task.save();
        return res.status(200).send("Successfully updated")
    }catch(err)
    {
        console.log(err);
        return res.status(500).send("Something went wrong.Please try again.")
    }
}

module.exports={
    getTask,
    AddTask,
    UpdateTask,
    DeleteTask,
    CompleteTask,
}