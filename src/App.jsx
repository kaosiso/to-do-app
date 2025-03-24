import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

const App = () => {
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [CompletedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const handleAddToDo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedToDoArr = [...allTodos];
    updatedToDoArr.push(newTodoItem);
    setTodos(updatedToDoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedToDoArr));
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...CompletedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("CompletedTodos", JSON.stringify(updatedCompletedArr));
  };

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...CompletedTodos];
    reducedTodo.splice(index);

    localStorage.setItem("CompletedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  useEffect(() => {
    let savedToDo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedToDo = JSON.parse(localStorage.getItem("CompletedTodos"));

    if (savedToDo) {
      setTodos(savedToDo);
    }

    if (savedCompletedToDo) {
      setCompletedTodos(savedCompletedToDo);
    }
  }, []);

  const handleEdit = (ind, item) => {
    console.log(ind);

    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateToDo = (value) => {
    let newToDo = [...allTodos]
    newToDo[currentEdit] = currentEditedItem
    setTodos(newToDo)
    setCurrentEdit("");
  };
  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev)=>{
      return {...prev,title:value}
    })
  };
  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev)=>{
      return {...prev,description:value}
    })
  };

  return (
    <div className="bg-blue-300 w-full h-screen overflow-hidden">
      <h1 className="text-center mt-[3%] font-extrabold text-2xl ">
        To Do App
      </h1>
      <div className="bg-purple-400 p-[2%] w-fit mx-auto mt-[3%] max-h-[80vh] overflow-y-auto rounded-2xl">
        <div className="flex items-center justify-center border-b-[1px] pb-[25px] mb-[25px]">
          <div className="flex flex-col items-start mr-[25px]">
            <label className="font-bold mb-[10px] ml-2.5 ">Title</label>
            <input
              className="p-[4px] pl-4 outline-none border-none focus:outline-none focus:ring focus:ring-purple-600 w-[300px] bg-purple-200 h-10 rounded-2xl "
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title? "
            />
          </div>
          <div className="flex flex-col items-start mr-[25px]">
            <label className="font-bold mb-[10px] ml-2.5 ">Description</label>
            <input
              className="p-[4px] pl-4 outline-none border-none focus:outline-none focus:ring focus:ring-purple-600 w-[450px] bg-purple-200 h-10 rounded-2xl "
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Describe the task? "
            />
          </div>
          <div className="todo-input-item pt-8">
            <button
              onClick={handleAddToDo}
              type="button"
              className="bg-purple-500 text-white cursor-pointer border-none rounded-xl  p-[10px] my-[5px] h-13 w-15 hover:bg-purple-800 "
            >
              Add
            </button>
          </div>
        </div>
        <div className="mb-[10px]">
          <button
            className={`bg-purple-300 h-10 px-5 rounded-xl m-2 cursor-pointer   ${
              isCompleteScreen === false && "active"
            }`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`bg-purple-300 h-10 px-5 rounded-xl m-2 cursor-pointer  ${
              isCompleteScreen === true && "active"
            }`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div
                    className="flex flex-col mt-3 gap-1.5  bg-purple-600 rounded-2xl  p-[10px] mb-3  justify-between  items-center"
                    key={index}
                  >
                    <input
                      className="w-200 m-4 h-10 rounded-2xl p-2 bg-purple-300  "
                      type="text"
                      placeholder="updated Title"
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditedItem.title}
                    />
                    <textarea
                        rows={4}

                      className="w-200  rounded-2xl p-2 bg-purple-300 "
                      placeholder="Updated Title"
                      onChange={(e) => handleUpdateDescription(e.target.value)}
                      value={currentEditedItem.description}
                    />

                    <button
                      onClick={handleUpdateToDo}
                      className="m-4 mt-5 hover:text-white  hover:bg-purple-800 bg-purple-300 p-2 rounded-xl text-sm"
                      title="update"
                    >
                      Update
                    </button>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="flex flex-row bg-purple-600 rounded-2xl  p-[10px] mb-3  justify-between h-25 items-center"
                  >
                    <div>
                      <h3 className="m-4 font-extrabold text-xl">
                        {item.title}
                      </h3>
                      <p className="m-4 text-gray-100 mt-0">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <MdOutlineDeleteOutline
                        className="h-10 w-10 text-white cursor-pointer hover:text-red-600"
                        onClick={() => handleDeleteTodo(index)}
                        title="Delete?"
                      />
                      <BsCheckLg
                        className="h-10 w-10  cursor-pointer hover:text-blue-500"
                        onClick={() => handleComplete(index)}
                        title="Complete"
                      />
                      <AiOutlineEdit
                        className="h-10 w-10  cursor-pointer hover:text-blue-500"
                        onClick={() => handleEdit(index, item)}
                        title="edit"
                      />
                    </div>
                  </div>
                );
              }
            })}

          {isCompleteScreen === true &&
            CompletedTodos.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row bg-purple-600 rounded-2xl  p-[10px] mb-3  justify-between  items-center"
                >
                  <div className="">
                    <h3 className="m-4 font-extrabold text-xl">{item.title}</h3>
                    <p className="m-4 text-gray-100 mt-0">{item.description}</p>
                    <p className="m-4">
                      <small>Completed on:{item.completedOn}</small>
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <MdOutlineDeleteOutline
                      className="h-10 w-10 text-white cursor-pointer hover:text-red-600"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
