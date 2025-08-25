console.log("typescript ok")

let taskInput = document.getElementById("taskInput") as HTMLInputElement;
let btnAdd = document.getElementById("addTask") as HTMLButtonElement;
let taskList = document.getElementById("taskList") as HTMLUListElement;
let table = document.querySelector("#taskTable tbody") as HTMLTableSectionElement;

interface Task {
  id: number;
  text: string;
  date: string;
  status: "à faire" | "En cours" | "Terminé";
}

let tasks: Task[] = [];

function saveTasks(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function createTaskRow(task: Task): HTMLTableRowElement {
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
    if (s === task.status) option.selected = true;
    selectStatus.appendChild(option);
  });

  
  selectStatus.addEventListener("change", () => {
    task.status = selectStatus.value as Task["status"];
    saveTasks();
  });

  tdStatus.appendChild(selectStatus);

  
  const tdActions = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Supprimer";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    tasks = tasks.filter(t => t.id !== task.id);
    table.removeChild(tr);
    saveTasks();
  });
  tdActions.appendChild(deleteBtn);
  tr.appendChild(tdText);
  tr.appendChild(tdDate);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
}


function addTask(): void{
    const taskText: string =taskInput.value.trim();

    if(taskText ===""){
        alert("Veuiller entrer une tache !");
        return;
    }

   const newTask: Task = {
    id: Date.now(), 
    text: taskText,
    date: new Date().toLocaleString(),
    status: "à faire"
  };

  tasks.push(newTask);
  const tr = createTaskRow(newTask);
  table.appendChild(tr);
  
  saveTasks();
  taskInput.value="";
}


function loadTasks(): void {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks) as Task[];
    tasks.forEach(task => {
      const tr = createTaskRow(task);
      table.appendChild(tr);
    });
  }
}


btnAdd.addEventListener("click", (event: MouseEvent) => {
  event.preventDefault();
  addTask();
});

taskInput.addEventListener("keypress", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

loadTasks();