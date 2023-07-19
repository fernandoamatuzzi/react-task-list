import "./styles.css";
import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/Tasklist/TaskList";
import { useState } from "react";

let idAcc = 0;
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    };
    setTasks((existingTasks) => {
      return [...existingTasks, newTask];
    });
  };

  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => {
    setTasks((existingTasks) => {
      return existingTasks.filter((task) => task.id !== id);
    });
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <TaskList
          title="Pendent"
          onAddTask={addTask}
          taskState="Pendent"
          tasks={tasks.filter((t) => t.state === "Pendent")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="In Progress"
          onAddTask={addTask}
          taskState="In Progress"
          tasks={tasks.filter((t) => t.state === "In Progress")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Resolved"
          onAddTask={addTask}
          taskState="Resolved"
          tasks={tasks.filter((t) => t.state === "Resolved")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
