const darkMode = document.querySelector(".darkMode");
const formList = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

//DARK AND LIGHT MODE FUNCTION
const darkModeButton = (e) => {
  let element = document.body;
  element.classList.toggle("darkMode");

  if (e.target.textContent === "Dark Mode") {
    e.target.textContent = "Light Mode";
    const taskTitle = document.querySelector("h1");
    taskTitle.style.color = "white";
    const saveFormTitle = document.querySelector("h2");
    saveFormTitle.style.color = "white";
    const formContainer = document.querySelector(".save-task-form");
    formContainer.style.background = "gray";
    return;
  }
  e.target.textContent = "Dark Mode";
  const taskTitle = document.querySelector("h1");
  taskTitle.style.color = "black";
  const saveFormTitle = document.querySelector("h2");
  saveFormTitle.style.color = "black";
  const formContainer = document.querySelector(".save-task-form");
  formContainer.style.background = "rgb(168, 204, 221)";
};

darkMode.addEventListener("click", darkModeButton);

//ADDING TASK FUNCTION
const addingTask = (e) => {
  e.preventDefault();
  const inputText = taskInput.value.trim();

  if (inputText === "") {
    window.alert("Please write a task");
    return;
  }

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("taskDiv");

  const taskLabel = document.createElement("label");

  taskLabel.textContent = inputText;

  taskDiv.appendChild(taskLabel);

  taskLabel.addEventListener("click", (e) => {
    e.target.classList.toggle("strikethrough");
  });

  // CREATING EDIT AND REMOVE BUTTONS!

  const divButtons = document.createElement("div");
  divButtons.classList.add("divButtons");
  const editButton = document.createElement("button");
  editButton.setAttribute("id", "editButton");
  editButton.style.background = "lightblue";

  editButton.textContent = "Edit";

  const removeButton = document.createElement("button");
  removeButton.classList.add("removeButton");
  removeButton.style.background = "tomato";
  removeButton.textContent = "Remove";

  divButtons.appendChild(editButton);
  divButtons.appendChild(removeButton);

  taskDiv.appendChild(divButtons);
  taskList.appendChild(taskDiv);

  taskInput.value = "";

  //EDIT AND REMOVE BUTTONS EVENTS

  editButton.addEventListener("click", () => {
    if (editButton.textContent.toLocaleLowerCase() === "edit") {
      const editInput = document.createElement("input");
      editInput.setAttribute("id", "edit_input");
      editInput.value = taskLabel.textContent;
      taskDiv.prepend(editInput);

      editButton.textContent = "Save";

      taskLabel.classList.add("hidden");
    } else {
      editButton.textContent = "Edit";

      taskLabel.classList.remove("hidden");

      taskLabel.textContent = document.getElementById("edit_input").value;
      document.getElementById("edit_input").remove();
    }
  });

  removeButton.addEventListener("click", () => {
    taskDiv.remove();
  });
};
formList.addEventListener("submit", addingTask);

const completedTasks = document.querySelector("#completedTaskButton");
completedTasks.style.background = "tomato";

//REMOVING COMPlETED TASK (parentNode)
const completedTask = () => {
  const list = document.querySelectorAll("label.strikethrough");
  list.forEach((label) => {
    label.parentNode.remove();
  });
};

completedTasks.addEventListener("click", completedTask);

//FORM VALIDATION

const saveForm = document.querySelector(".save-task-form");
const inputname = saveForm.elements["name"];
const inputLastName = saveForm.elements["lastName"];
const inputEmail = saveForm.elements["email"];

const validate = (e) => {
  e.preventDefault();
  if (
    inputname.value === "" ||
    inputLastName.value === "" ||
    inputEmail.value === ""
  ) {
    window.alert("Please fill all the fields");
    return;
  }

  const user = {
    name: inputname.value,
    lastName: inputLastName.value,
    email: inputEmail.value,
  };

  window.alert("Tasks Successfully Save ");
};

saveForm.addEventListener("submit", validate);
