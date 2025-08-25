// task.ts
export interface Task {
  id: number;
  text: string;
  date: string;
  status: "à faire" | "En cours" | "Terminé";
}

let tasks: Task[] = [];

export function getTasks(): Task[] {
  return tasks;
}

export function saveTasks(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasksFromStorage(): void {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks) as Task[];
  }
}

export function addTask(task: Task): void {
  tasks.push(task);
  saveTasks();
}

export function deleteTask(taskId: number): void {
  tasks = tasks.filter(t => t.id !== taskId);
  saveTasks();
}
