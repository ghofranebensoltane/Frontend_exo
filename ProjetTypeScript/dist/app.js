"use strict";
console.log("typescript ok");
let taskInput = document.getElementById("taskInput");
let btnAdd = document.getElementById("addTask");
let taskList = document.getElementById("taskList");
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Veuiller entrer une tache !");
        return;
    }
    const li = document.createElement("li");
    li.textContent = taskText;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "supprimer";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(li);
    });
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    taskInput.value = "";
}
btnAdd.addEventListener("click", (event) => {
    addTask();
});
