import KanbanAPI from "../api/KanbanApi.js";

const createSubtask = ({ content }, index, subtasks) => {

    const { title } = content;
    const subtaskContainer = document.createElement('div');
    subtaskContainer.className = `flex items-center gap-[0.5rem] rounded-lg`;
    subtaskContainer.innerHTML = `
    <input type='text' value='${title}' class='input-subtask py-[0.5rem] px-[1rem] grow rounded-lg bg-transparent outline-none text-white  border border-[rgb(130,143,163,25%)]' placeholder='e.g. Take coffee break'/>
    <button class='remove-subtask'>
        <img src="../assets/icon-cross.svg" alt="cross" />
    </button>    
    `;

    const inputSubtasks = subtaskContainer.querySelectorAll('.input-subtask');
    const deleteSubtask = subtaskContainer.querySelector('.remove-subtask');
    deleteSubtask.addEventListener('click', () => {
        subtaskContainer.remove();
        subtasks.splice(index, 1);
    });
    inputSubtasks.forEach((input) => {
        input.onchange = (e) => {
            if (subtasks[index] === undefined) {
                subtasks[index] = {
                    id: Math.floor(Math.random() * 1000000),
                    content: {
                        title: e.target.value,
                        isCompleted: false
                    }
                };
            } else {
                subtasks[index].content.title = e.target.value;
            }

        };
    });
    return subtaskContainer;
};

export const createEditCardModal = ({ content, id }) => {
    console.log(content);
    const editCardModal = document.createElement('div');
    const { title, description, status, subTasks } = content;
    editCardModal.id = 'edit-card-modal';
    editCardModal.className = 'fixed inset-0 bg-[rgba(0,0,0,0.5)]  flex justify-center items-center';
    editCardModal.innerHTML = `
    <div class='bg-[#2B2C37] p-[1.5rem] w-[343px] text-white rounded-lg flex flex-col gap-[1.5rem] md:w-[480px] md:p-[2rem]'>
    <h1 class='text-[1.325rem] font-semibold'>Edit Task</h1>
        <div class='flex flex-col gap-[0.5rem]'>
            <h6 class='text-[0.875rem] font-semibold tracking-wide'>Title</h6>
            <input id='input-title' type='text' class='py-[0.5rem] px-[1rem] hover:border-[#635FC7] transition-all duration-500 rounded-lg bg-transparent outline-none text-white placeholder:text-[rgb(130,143,163,25%)] border border-[rgb(130,143,163,25%)]' value='${title}'/>
        </div>
        <div class='flex flex-col gap-[0.5rem]'>
            <h6 class='text-[0.875rem] font-semibold tracking-wide'>Description</h6>
            <textarea id='description'  class='py-[0.5rem] px-[1rem] hover:border-[#635FC7] transition-all resize-none rounded-lg bg-transparent outline-none text-white placeholder:text-[rgb(130,143,163,25%)] border border-[rgb(130,143,163,25%)]' placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little." rows="4">${description}</textarea>
        </div>
        <div class='subtasks flex flex-col gap-[0.5rem]'>
            <h6 class='text-[0.875rem] font-semibold tracking-wide'>Subtasks</h6>
            <button class='py-[0.5rem] px-[1rem] bg-white rounded-3xl text-[#635FC7] font-semibold'>+ Add New Subtask</button>
        </div>
        <div class='flex flex-col gap-[0.5rem]'>
            <h6 class='text-[0.875rem] font-semibold tracking-wide'>Status</h6>
            <select id='status' type='text' class='py-[0.5rem] px-[1rem] rounded-lg bg-[#2B2C37] outline-none text-white  border border-[rgb(130,143,163,25%)] focus:border-[#635FC7]'>
                <option selected value='${status}'>${status}</option>
                <option value='ToDo'>ToDo</option>
                <option value='InProgress'>InProgress</option>
                <option value='Done'>Done</option>
            </select>
        </div>
        <button id='create-new-task' class='py-[0.5rem] px-[1rem] bg-[#635FC7] rounded-3xl text-white font-semibold'>Create Task</button>
    </div>`;
    const createNewTask = editCardModal.querySelector('#create-new-task');
    const subtaskContainer = editCardModal.querySelector('.subtasks');
    const addBtn = editCardModal.querySelector('.subtasks > button');
    const inputTitle = editCardModal.querySelector('#input-title');
    const descriptionInput = editCardModal.querySelector('#description');
    const statusInput = editCardModal.querySelector('#status');


    addBtn.addEventListener('click', () => {
        const subtaskInput = createSubtask({ content: { title: '', isCompleted: false } }, subTasks.length, subTasks);
        subtaskContainer.insertBefore(subtaskInput, addBtn);
    });

    inputTitle.onchange = (e) => {
        content.title = e.target.value;
        console.log(content.title)
    };

    descriptionInput.onchange = (e) => {
        content.description = e.target.value;
    };

    statusInput.onchange = (e) => {
        content.status = e.target.value;
    }
    console.log(content.title);
    subTasks?.forEach((subtask, index) => {
        const subtaskInput = createSubtask(subtask, index, subTasks);
        subtaskContainer.insertBefore(subtaskInput, addBtn);
    });

    createNewTask.addEventListener('click', () => {
        const column = KanbanAPI.getTasksByColumn(content.status);
        console.log(column);
        console.log(content.subTasks);
        if (content.status === status) {
            KanbanAPI.updateTask(id, { content: content });
            window.location.reload();
        } else {
            KanbanAPI.updateTask(id, { status: content.status, position: column.length, content: content });
            window.location.reload();
        }
    });

    return editCardModal;
};