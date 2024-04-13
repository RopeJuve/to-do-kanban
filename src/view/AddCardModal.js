import KanbanAPI from "../api/KanbanApi.js";



export const createAddTaskModal = () => {
    let subTaskState = [];
    let state = {
        title: '',
        description: '',
        subTasks: subTaskState,
        status: ''
    }


    const cardAddTaskModal = document.createElement('div');
    cardAddTaskModal.id = 'add-task-modal';
    cardAddTaskModal.className = 'fixed inset-0 bg-[rgba(0,0,0,0.5)]  flex justify-center items-center';
    cardAddTaskModal.innerHTML = `
    <div class='bg-[#2B2C37] p-[1.5rem] w-[343px] text-white rounded-lg flex flex-col gap-[1.5rem] md:w-[480px] md:p-[2rem]'>
    <h1 class='text-[1.325rem] font-semibold'>Add New Task</h1>
        <div class='flex flex-col gap-[0.5rem]'>
            <h6 class='text-[0.875rem] font-semibold tracking-wide'>Title</h6>
            <input id='input-title' type='text' class='py-[0.5rem] px-[1rem]  rounded-lg bg-transparent outline-none text-white placeholder:text-[rgb(130,143,163,25%)] border border-[rgb(130,143,163,25%)]' placeholder='e.g. Take coffee break'/>
        </div>
        <div class='flex flex-col gap-[0.5rem]'>
            <h6 class='text-[0.875rem] font-semibold tracking-wide'>Description</h6>
            <textarea id='description'  class='py-[0.5rem] px-[1rem] resize-none rounded-lg bg-transparent outline-none text-white placeholder:text-[rgb(130,143,163,25%)] border border-[rgb(130,143,163,25%)]' placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little." rows="4"></textarea>
        </div>
        <div class='flex flex-col gap-[0.5rem]'>
            <h6 class='text-[0.875rem] font-semibold tracking-wide'>Subtasks</h6>
            <input type='text' class='input-subtask py-[0.5rem] px-[1rem]  rounded-lg bg-transparent outline-none text-white placeholder:text-[rgb(130,143,163,25%)] border border-[rgb(130,143,163,25%)]' placeholder='e.g. Take coffee break'/>
            <input type='text' class='input-subtask py-[0.5rem] px-[1rem]  rounded-lg bg-transparent outline-none text-white placeholder:text-[rgb(130,143,163,25%)] border border-[rgb(130,143,163,25%)]' placeholder='e.g. Take coffee break'/>
            <button class='py-[0.5rem] px-[1rem] bg-white rounded-3xl text-[#635FC7] font-semibold'>+ Add New Subtask</button>
        </div>
        <div class='flex flex-col gap-[0.5rem]'>
            <h6 class='text-[0.875rem] font-semibold tracking-wide'>Status</h6>
            <input id='status' type='text' class='py-[0.5rem] px-[1rem]  rounded-lg bg-transparent outline-none text-white placeholder:text-[rgb(130,143,163,25%)] border border-[rgb(130,143,163,25%)]' placeholder='e.g. ToDo'/>
        </div>
        <button id='create-new-task' class='py-[0.5rem] px-[1rem] bg-[#635FC7] rounded-3xl text-white font-semibold'>Create Task</button>
    </div>`
    const inputTitle = cardAddTaskModal.querySelector('#input-title');
    const inputDescription = cardAddTaskModal.querySelector('#description');
    const inputStatus = cardAddTaskModal.querySelector('#status');
    const inputSubtask = cardAddTaskModal.querySelectorAll('.input-subtask');
    const createNewTask = cardAddTaskModal.querySelector('#create-new-task');

    inputSubtask.forEach((input) => {
        input.onchange = (e) => {
            subTaskState.push({
                id: Math.floor(Math.random() * 1000000),
                content: {
                    title: e.target.value,
                    isCompleted: false
                }
            });
            state = {
                ...state,
                subTasks: subTaskState
            }
        }
    });

    inputTitle.onchange = (e) => {
        state = {
            ...state,
            title: e.target.value
        }
        console.log(state)
    };

    inputDescription.onchange = (e) => {
        state = {
            ...state,
            description: e.target.value
        }
        console.log(state)
    }

    inputStatus.onchange = (e) => {
        state = {
            ...state,
            status: e.target.value
        }
        console.log(state)
    }

    console.log(state);
    createNewTask.addEventListener('click', () => {
        console.log(state);
        KanbanAPI.addTaskToColumn(state.status, state);
        window.location.reload();
    });
    return cardAddTaskModal;
};