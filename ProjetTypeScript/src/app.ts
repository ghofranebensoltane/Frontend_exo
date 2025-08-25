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

interface ApiTask{
    userId: number;
    id: number;
    title: string;
    completed: boolean;
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

async function fetchApiTasks(): Promise<void> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
    if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
    const apiTasks: ApiTask[] = await response.json();

    apiTasks.forEach(apiTask => {
      const newTask: Task = {
        id: apiTask.id + Date.now(), // pour éviter les doublons
        text: apiTask.title,
        date: new Date().toLocaleString(),
        status: apiTask.completed ? "Terminé" : "à faire"
      };

      const tr = createTaskRow(newTask);
      table.appendChild(tr);
    });

  } catch (error) {
    console.error("Erreur lors de la récupération de l’API :", error);
    alert("Impossible de charger les suggestions de tâches depuis l’API.");
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
fetchApiTasks();