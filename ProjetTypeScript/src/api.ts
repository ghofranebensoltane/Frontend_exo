// api.ts
import { Task } from "./task.js";

export interface ApiTask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function fetchApiTasks(): Promise<Task[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
    if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
    const apiTasks: ApiTask[] = await response.json();

    return apiTasks.map(apiTask => ({
      id: apiTask.id + Date.now(),
      text: apiTask.title,
      date: new Date().toLocaleString(),
      status: apiTask.completed ? "Terminé" : "à faire"
    }));
  } catch (error) {
    console.error("Erreur API:", error);
    alert("Impossible de charger les suggestions de tâches depuis l’API.");
    return [];
  }
}
