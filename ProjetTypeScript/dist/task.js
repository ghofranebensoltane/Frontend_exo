let tasks = [];
export function getTasks() {
    return tasks;
}
export function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
export function loadTasksFromStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}
export function addTask(task) {
    tasks.push(task);
    saveTasks();
}
export function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks();
}
