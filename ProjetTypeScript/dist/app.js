import { addTask, loadTasksFromStorage, getTasks, deleteTask } from "./task.js";
import { fetchApiTasks } from "./api.js";
const taskInput = document.getElementById("taskInput");
const btnAdd = document.getElementById("addTask");
const table = document.querySelector("#taskTable tbody");
function createTaskRow(task) {
    const tr = document.createElement("tr");
    const tdText = document.createElement("td");
    tdText.textContent = task.text;
    const tdDate = document.createElement("td");
    tdDate.textContent = task.date;
    const tdStatus = document.createElement("td");
    const selectStatus = document.createElement("select");
    ["À faire", "En cours", "Terminé"].forEach(s => {
        const option = document.createElement("option");
        option.value = s;
        option.textContent = s;
        if (s === task.status)
            option.selected = true;
        selectStatus.appendChild(option);
    });
    selectStatus.addEventListener("change", () => {
        task.status = selectStatus.value;
        addTask(task); // sauvegarde mise à jour
    });
    tdStatus.appendChild(selectStatus);
    const tdActions = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        deleteTask(task.id);
        table.removeChild(tr);
    });
    tdActions.appendChild(deleteBtn);
    tr.appendChild(tdText);
    tr.appendChild(tdDate);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);
    return tr;
}
function loadTasksToTable() {
    loadTasksFromStorage();
    getTasks().forEach(task => table.appendChild(createTaskRow(task)));
}
btnAdd.addEventListener("click", (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (!taskText)
        return alert("Veuillez entrer une tâche !");
    const newTask = {
        id: Date.now(),
        text: taskText,
        date: new Date().toLocaleString(),
        status: "à faire"
    };
    addTask(newTask);
    table.appendChild(createTaskRow(newTask));
    taskInput.value = "";
});
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        btnAdd.click();
    }
});
async function init() {
    loadTasksToTable();
    const apiTasks = await fetchApiTasks();
    apiTasks.forEach(task => table.appendChild(createTaskRow(task)));
}
init();
