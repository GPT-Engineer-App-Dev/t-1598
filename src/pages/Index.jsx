import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setEditingText(task.text);
  };

  const editTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id ? { ...task, text: editingText } : task
      )
    );
    setEditingTask(null);
    setEditingText("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Todo List</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task description"
          />
        </CardContent>
        <CardFooter>
          <Button className="bg-green-500 text-white" onClick={addTask}>Add Task</Button>
        </CardFooter>
      </Card>
      <div className="mt-6">
        {tasks.map((task) => (
          <Card key={task.id} className="mb-4">
            <CardContent>
              {editingTask && editingTask.id === task.id ? (
                <Input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <p>{task.text}</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {editingTask && editingTask.id === task.id ? (
                <Button onClick={editTask}>Save</Button>
              ) : (
                <Button onClick={() => startEditing(task)}>Edit</Button>
              )}
              <Button variant="destructive" onClick={() => deleteTask(task.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;