const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const taskSchema=new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      content: { type: String },
      isCompleted:{type: Boolean},
});

module.exports=mongoose.model('Task',taskSchema);
