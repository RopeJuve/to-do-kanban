import KanbanAPI from "../api/KanbanApi.js";
import { createEditCardModal } from "./EditCardModal.js";

const createMenu = (id) => {

    const menu = document.createElement('div');
    menu.className = 'absolute z-[10] top-[2rem] w-[192px] right-[-1rem] bg-[#20212C] p-[1rem] rounded-lg flex flex-col text-left gap-[0.5rem]';
    menu.innerHTML = `
    <button id='edit-task' class='text-white text-left hover:text-[#635FC7] hover:transition-all hover:duration-500'>Edit Task</button>
    <button id='delete-task' class='text-[#EA5555] text-left hover:text-white hover:transition-all hover:duration-500'>Delete Task</button>
    `
    const deleteTask = menu.querySelector('#delete-task');
    const editTask = menu.querySelector('#edit-task');

    deleteTask.addEventListener('click', () => {
        KanbanAPI.deleteTask(id);
        window.location.reload();
    });
    editTask.addEventListener('click', () => {
        const card = KanbanAPI.getTask(id);
        const editModal = createEditCardModal(card);
        document.body.appendChild(editModal);
        document.querySelector('#card-modal').remove();

    });
    return menu;

}


export const createCardModal = ({ content, id }) => {
    const { title, description, status, subTasks } = content;
    const cardModal = document.createElement('div');
    const completedSubTasks = subTasks.filter((subTask) => subTask.content.isCompleted).length;
    cardModal.id = 'card-modal';
    cardModal.dataset.modalId = id;
    cardModal.className = 'fixed inset-0 bg-[rgba(0,0,0,0.5)]  flex justify-center items-center';
    cardModal.innerHTML = `
    <div class='bg-[#2B2C37] p-[1.5rem] w-[343px] text-white rounded-lg flex flex-col gap-[1.5rem] md:w-[480px] md:p-[2rem]'>
        <div class=' flex justify-between items-center md:gap-[2rem]'>
             <h1 class='text-[1.325rem] font-semibold'>${title}</h1>
            <div class='header-container relative h-[100%] w-[20px] '>
            <img
                class="cursor-pointer menu relative"
                src="../assets/icon-vertical-ellipsis.svg"
                alt="dots"
             />
            </div>
        </div>
        <p class='opacity-[0.5] text-[0.875rem] leading-6 tracking-wider'>${description}</p>
        <div id='subtask-container' class='flex flex-col gap-[0.5rem]'>
           <h6 class='text-[0.875rem] font-semibold tracking-wide'>Subtasks (${completedSubTasks} of ${subTasks.length})</h6>
           <div class='flex flex-col gap-[0.5rem]'>
                ${subTasks.map(subtask => (
        `    <div class='flex items-center gap-[0.5rem] p-[0.875rem] bg-[#20212C] rounded-lg hover:bg-[#635FC7] hover:transition-all hover:duration-500'>
                        <input id=${subtask.id} class='checkbox form-checkbox border border-[rgb(130, 143, 163, 24.89%)] bg-[#2B2C37] rounded-sm text-[#635FC7]' type='checkbox' ${subtask.content.isCompleted ? 'checked' : ''}  />
                        <p class='text-[0.875rem] tracking-wide ${subtask.content.isCompleted ? 'line-through opacity-50' : ''}'>${subtask.content.title}</p>
                    </div>`
    )).join('')}
           </div>
        </div>
        <div class='flex flex-col gap-[0.5rem]'>
            <h6 class='text-[0.875rem] font-semibold tracking-wide'>Current Status</h6>
            <p class='p-[0.5rem] border border-[#828FA3] rounded-lg'>${status}</p>
        </div>
    </div>
    `
    const menu = cardModal.querySelector('.menu');
    const headerContainer = cardModal.querySelector('.header-container');

    menu.addEventListener('click', () => {
        const editMenu = createMenu(id);
        headerContainer.appendChild(editMenu);
    })

    const checkbox = cardModal.querySelectorAll('.checkbox');
    checkbox.forEach((input) => {
        input.onchange = (e) => {
            console.log(e.target.checked, e.target.id, id)
            KanbanAPI.updateSubtask(id, Number(e.target.id), e.target.checked);
            window.location.reload();
        }
    });
    return cardModal;
}; 