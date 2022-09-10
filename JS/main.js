let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let all = document.getElementById("delall")
let body = document.querySelector("body")

// Empty Array To Store The Tasks
let arrayOfTasks = [];

let darkMood = localStorage.getItem("darkmood")
let lightMood = localStorage.getItem("lightmood")
let Small = localStorage.getItem("small")
let Med = localStorage.getItem("med")
let Large = localStorage.getItem("large")
let First = localStorage.getItem("first")
let Sec = localStorage.getItem("sec")
let Third = localStorage.getItem("third")

// Settings


if(darkMood !== null) {
  body.className = "darkmood"
}
if(lightMood !== null) {
  body.className = "lightmood"
}
if(Small !== null) {
  body.style.fontSize = "12px"
}
if(Med !== null) {
  body.style.fontSize = "16px"
}
if(Large !== null) {
  body.style.fontSize = "20px"
}
if(First !== null) {
  body.style.fontFamily = "'Quicksand', sans-serif"
}
if(Sec !== null) {
  body.style.fontFamily = "sans-serif"
}
if(Third !== null) {
  body.style.fontFamily = "'Poppins', sans-serif"
}


// Settings




// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();




// if(tasksDiv.innerHTML !== ""){
//   all.style.display = "block"
// }else{
//   all.style.display = "none"
// }
// let deldiv = document.querySelector(".deleteall")
// if(arrayOfTasks.length >= 0){
//   deldiv.innerHTML = `<a id="delall" class="wow animate__fadeIn" onclick="deleteAll()" style="text-align: center; cursor: pointer; text-decoration: none; color: white; background-color: red; padding: 6px 8px; border-radius: 3px; width: auto; margin: 10px;">Delete All ${arrayOfTasks.length} <i class="fa-solid fa-trash"></i></a>`

// }

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
  }

};



// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");

  }
});

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";
  // Looping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // div.id = "liveToastBtn"
    // Check If Task is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.innerHTML = `<i class="fa-solid fa-xmark"></i> <i class="fa-solid fa-check wow animate__flipInX" data-wow-delay=".3s" id="true"></i>`
    // Append Button To Main Div
    div.appendChild(span);
    // Add Task Div To Tasks Container
    tasksDiv.appendChild(div);
  });
}


if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
  })
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

// function getSettings() {
//   let set = window.localStorage.getItem("tasks")
//   if(set){

//   }
// }

function deleteTaskWith(taskId) {
  // For Explain Only
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  // }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}

function deleteAll() {
  tasksDiv.innerHTML = ""
  window.localStorage.removeItem("tasks")
  setTimeout(function () { location.reload() }, 100)
}

// function delcomp(){
//   for(let i = 0 ; i < arrayOfTasks.length ; i++){
//     if(task[i].completed){
//       this.toggle.remove()
//     }
//   }
//   window.localStorage.removeItem("task.completed")
// }


function darkmood(){
  body.className = "darkmood"

  window.localStorage.removeItem("lightmood")

  window.localStorage.setItem("darkmood" , body.className)

}


function lightmood(){
  body.className = "lightmood"

  window.localStorage.removeItem("darkmood")

  window.localStorage.setItem("lightmood" , body.className)

}

function small(){
  body.style.fontSize = "12px"

  window.localStorage.removeItem("med")
  window.localStorage.removeItem("large")

  window.localStorage.setItem("small" , body.style.fontSize)

}
function med(){
  body.style.fontSize = "16px"

  window.localStorage.removeItem("small")
  window.localStorage.removeItem("large")

  window.localStorage.setItem("med" , body.style.fontSize)

}
function large(){
  body.style.fontSize = "20px"

  window.localStorage.removeItem("small")
  window.localStorage.removeItem("med")

  window.localStorage.setItem("large" , body.style.fontSize)

}

function first(){
  body.style.fontFamily = "'Quicksand', sans-serif"

  window.localStorage.removeItem("sec")
  window.localStorage.removeItem("third")

  window.localStorage.setItem("first" , body.style.fontFamily)

}
function sec(){
  body.style.fontFamily = "sans-serif"

  window.localStorage.removeItem("first")
  window.localStorage.removeItem("third")

  window.localStorage.setItem("sec" , body.style.fontFamily)

}
function third(){
  body.style.fontFamily = "'Poppins', sans-serif"

  window.localStorage.removeItem("first")
  window.localStorage.removeItem("sec")

  window.localStorage.setItem("third" , body.style.fontFamily)

}