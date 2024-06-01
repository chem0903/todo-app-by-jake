import { useState } from "react";
import "./App.css";

function App() {
  const [taskName, setTaskName] = useState("");
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);

  const onChangeTaskName = (event) => setTaskName(event.target.value);

  const addTask = () => {
    const newTasks = [...incompleteTasks, taskName];
    setIncompleteTasks(newTasks);
    setTaskName("");
  };

  const deleteTask = (index) => {
    const newIncompleteTasks = [...incompleteTasks];
    newIncompleteTasks.splice(index, 1);
    setIncompleteTasks(newIncompleteTasks);
  };

  const completeTask = (index) => {
    const newIncompleteTasks = [...incompleteTasks];
    const completedTask = newIncompleteTasks.splice(index, 1);

    const newCompleteTasks = [...completeTasks];
    newCompleteTasks.push(completedTask.join(""));

    setIncompleteTasks(newIncompleteTasks);
    setCompleteTasks(newCompleteTasks);
  };

  const returnTask = (index) => {
    const newCompleteTasks = [...completeTasks];
    newCompleteTasks.splice(index, 1);

    const newIncompleteTasks = [...incompleteTasks, completeTasks[index]];

    setIncompleteTasks(newIncompleteTasks);
    setCompleteTasks(newCompleteTasks);
  };

  return (
    <>
      <div class="inputArea">
        <input
          id="addText"
          type="text"
          placeholder="TODOを入力"
          value={taskName}
          onChange={onChangeTaskName}
        />
        <button id="addButton" onClick={addTask}>
          追加
        </button>
      </div>

      <div class="incompleteArea">
        <p class="title">未完了のTODO</p>
        <ul id="incompleteList">
          {incompleteTasks.map((incompleteTask, index) => (
            <li key={incompleteTask}>
              <div class="listLow">
                <p class="todoItem">{incompleteTask}</p>
                <button
                  onClick={() => {
                    completeTask(index);
                  }}
                >
                  完了
                </button>
                <button
                  onClick={() => {
                    deleteTask(index);
                  }}
                >
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div class="completeArea">
        <p class="title">完了したTODO</p>
        <ul id="completeList">
          {completeTasks.map((completeTask, index) => (
            <li key={completeTask}>
              <div class="listLow">
                <p class="todoItem">{completeTask}</p>
                <button
                  onClick={() => {
                    returnTask(index);
                  }}
                >
                  戻す
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
