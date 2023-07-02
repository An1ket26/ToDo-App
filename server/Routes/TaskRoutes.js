const express=require('express')
const auth=require("../Middleware/auth");
const TaskController=require("../Controllers/TaskController");

const router=express.Router();

router.get("/",auth,TaskController.getTask);
router.post("/add",auth,TaskController.AddTask);
router.patch("/update",auth,TaskController.UpdateTask);
router.delete("/delete",auth,TaskController.DeleteTask);
router.patch("/complete",auth,TaskController.CompleteTask);

module.exports=router;