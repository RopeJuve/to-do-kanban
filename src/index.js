import KanbanAPI from "./api/KanbanApi.js";
import { createCard } from "./view/Card.js"
const data = KanbanAPI.getTasksByColumn('To Do');

const taskCards = data.map(task => (
    createCard(task)
))

const taskContainer = document.querySelector('#task-container');

taskCards.forEach(card => {
    taskContainer.appendChild(card);
});