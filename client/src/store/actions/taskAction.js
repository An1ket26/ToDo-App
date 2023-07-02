import { openAlertMessage } from "./alertActions";

export const taskActions = {
  SET_TASK: "TASK.SET_TASK",
  UPDATE_TASK: "TASK.UPDATE_TASK",
  DELETE_TASK: "TASK.DELETE_TASK",
  COMPLETE_TASK: "TASK.COMPLETE_TASK",
};

export const getActions = (dispatch) => {
  return {
    addTask: (task) => dispatch(addTask(task)),
    updateTask: (task) => dispatch(updateTask(task)),
    deleteTask: (task) => dispatch(deleteTask(task)),
    completeTask: (task) => dispatch(completeTask(task)),
    addTodo: (taskDetails) => dispatch(addTodo(taskDetails)),
    updateTodo: (taskDetails) => dispatch(updateTodo(taskDetails)),
    deleteTodo: (taskDetails) => dispatch(deleteTodo(taskDetails)),
    completeTodo: (taskDetails) => dispatch(completeTodo(taskDetails)),
    getTodo: () => dispatch(getTodo()),
  };
};

const addTask = (task) => {
  return {
    type: taskActions.SET_TASK,
    payload: {
      id: task._id,
      author: task.author,
      content: task.content,
      isCompleted: task.isCompleted,
    },
  };
};
const updateTask = (task) => {
  return {
    type: taskActions.UPDATE_TASK,
    payload: {
      id: task.id,
      content: task.content,
    },
  };
};
const deleteTask = (task) => {
  return {
    type: taskActions.DELETE_TASK,
    id: task.id,
  };
};
const completeTask = (task) => {
  return {
    type: taskActions.COMPLETE_TASK,
    payload: {
      id: task.id,
    },
  };
};

const addTodo = (taskDetails) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:5000/api/task/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("user")).token,
      },
      body: JSON.stringify(taskDetails),
    });
    if (!response.ok) {
      const text = await response.text();
      dispatch(openAlertMessage(text));
    } else {
      const taskDetails = await response.json();
      // console.log(taskDetails);
      dispatch(addTask(taskDetails));
    }
  };
};
const updateTodo = (taskDetails) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:5000/api/task/update", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("user")).token,
      },
      body: JSON.stringify(taskDetails),
    });
    if (!response.ok) {
      const text = await response.text();
      dispatch(openAlertMessage(text));
    } else {
      dispatch(updateTask(taskDetails));
    }
  };
};
const deleteTodo = (taskDetails) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:5000/api/task/delete", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("user")).token,
      },
      body: JSON.stringify(taskDetails),
    });
    if (!response.ok) {
      const text = await response.text();
      dispatch(openAlertMessage(text));
    } else {
      dispatch(deleteTask(taskDetails));
    }
  };
};
const completeTodo = (taskDetails) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:5000/api/task/complete", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("user")).token,
      },
      body: JSON.stringify(taskDetails),
    });
    if (!response.ok) {
      const text = await response.text();
      dispatch(openAlertMessage(text));
    } else {
      dispatch(completeTask(taskDetails));
    }
  };
};

const getTodo = () => {
  // console.log(JSON.parse(localStorage.getItem("user")).token);
  return async (dispatch) => {
    const response = await fetch("http://localhost:5000/api/task", {
      method: "GET",
      headers: {
        authorization: JSON.parse(localStorage.getItem("user")).token,
      },
    });
    if (response.error) {
      console.log("error in adding task");
    } else if ((await response.status) === 200) {
      const taskDetails = await response.json();
      taskDetails.map((tasks) => dispatch(addTask(tasks)));
      // console.log(taskDetails);
    } else {
      console.log(response);
    }
  };
};
