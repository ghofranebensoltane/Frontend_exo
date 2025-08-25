console.log("typescript ok")

let taskInput = document.getElementById("taskInput") as HTMLInputElement;
let btnAdd = document.getElementById("addTask") as HTMLButtonElement;
let taskList = document.getElementById("taskList") as HTMLUListElement;

function addTask(): void{
    const taskText: string =taskInput.value.trim();

    if(taskText ===""){
        alert("Veuiller entrer une tache !");
        return;
    }
    
    const li: HTMLLIElement = document.createElement("li");
    li.textContent=taskText;

    const deleteBtn: HTMLButtonElement =document.createElement("button");
    deleteBtn.textContent ="supprimer";
    deleteBtn.style.marginLeft="10px";

    deleteBtn.addEventListener("click",()=>{
        taskList.removeChild(li);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    taskInput.value="";
}

btnAdd.addEventListener("click", (event:MouseEvent)=>{
    addTask();

})