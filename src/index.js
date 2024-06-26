import KanbanAPI from "./api/KanbanApi.js";
import { createAddTaskModal } from "./view/AddCardModal.js";
import { createCard } from "./view/Card.js";
import { createCardModal } from "./view/CardModal.js";
import { createColumn } from "./view/Column.js";

const sidebar = document.querySelector('#side-bar');
const hideSidebar = document.querySelector('#hide-side-bar');
const showSidebar = document.querySelector('#show-side-bar');
const addTaskBtn = document.querySelector('#add-task');
const navBar = document.querySelector('#nav-bar');
const boardContainer = document.querySelector('#board-container');



const board = KanbanAPI.getBoard();

const [todo, inProgress, done] = board;
const columnFragment = document.createDocumentFragment();

board.forEach((column) => {
    const createdColumn = createColumn(column);
    columnFragment.appendChild(createdColumn);
}
);

boardContainer.appendChild(columnFragment);


const todoTaskContainer = document.querySelector('#ToDo');
const inProgressTaskContainer = document.querySelector('#InProgress');
const doneTaskContainer = document.querySelector('#Done');

todo.tasks.forEach((task) => {
    const card = createCard(task);
    todoTaskContainer.appendChild(card);
});


inProgress.tasks.forEach((task) => {
    const card = createCard(task);
    inProgressTaskContainer.appendChild(card);
});

done.tasks.forEach((task) => {
    const card = createCard(task);
    doneTaskContainer.appendChild(card);
});

addTaskBtn.addEventListener('click', () => {
    const cardAddTaskModal = createAddTaskModal();
    document.body.appendChild(cardAddTaskModal);
});


document.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-id')) {
        const cardId = e.target.dataset.id;
        const card = KanbanAPI.getTask(Number(cardId));
        const modal = createCardModal(card);
        document.body.appendChild(modal);
    }
    if (e.target.hasAttribute('data-modal-id')) {
        const modalId = e.target.dataset.modalId;
        const modal = document.querySelector(`[data-modal-id="${modalId}"]`);
        modal.remove();
    }

    if (e.target.id === 'add-task-modal') {
        e.target.remove();
    }
    if (e.target.id === 'edit-card-modal') {
        e.target.remove();
    }
});



hideSidebar.addEventListener('click', () => {
    sidebar.classList.remove('md:w-[300px]');
    sidebar.classList.add('md:w-0', 'transition-all', 'duration-500');
    boardContainer.classList.remove('md:ml-[300px]');
    boardContainer.classList.add('md:ml-0', 'transition-all', 'duration-500');
    navBar.classList.remove('md:ml-[300px]');
    navBar.classList.add('md:ml-0', 'transition-all', 'duration-500');
    showSidebar.classList.remove('hidden');
});

showSidebar.addEventListener('click', () => {
    sidebar.classList.remove('md:w-0');
    sidebar.classList.add('md:w-[300px]');
    boardContainer.classList.remove('md:ml-0');
    boardContainer.classList.add('md:ml-[300px]');
    navBar.classList.add('md:ml-[300px]');
    navBar.classList.remove('md:ml-0');
    showSidebar.classList.add('hidden');
});