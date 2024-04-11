export const createCardModal = ({ content, id }) => {
    const { title, description, status, subTasks } = content;
    const cardModal = document.createElement('div');
    const completedSubTasks = subTasks.filter((subTask) => subTask.isCompleted).length;
    cardModal.dataset.modalId = id;
    cardModal.className = 'fixed inset-0 bg-[rgba(0,0,0,0.5)]  flex justify-center items-center';
    cardModal.innerHTML = `
    <div class='bg-[#2B2C37] p-[1.5rem] w-[343px] text-white rounded-lg flex flex-col gap-[1.5rem]'>
        <div class='flex justify-between items-center'>
             <h1 class='text-[1.325rem] font-semibold'>${title}</h1>
             <img
             class="cursor-pointer"
             src="../assets/icon-vertical-ellipsis.svg"
             alt="dots"
           />
        </div>
        <p class='opacity-[0.5] text-[0.875rem] leading-6 tracking-wider'>${description}</p>
        <div id='subtask-container' class='flex flex-col gap-[0.5rem]'>
           <h6 class='text-[0.875rem] font-semibold tracking-wide'>Subtasks (${completedSubTasks} of ${subTasks.length})</h6>
           <div class='flex flex-col gap-[0.5rem]'>
                ${subTasks.map(subtask =>(
                `    <div class='flex items-center gap-[0.5rem] p-[0.875rem] bg-[#20212C] rounded-lg'>
                        <input type='checkbox' ${subtask.isCompleted} ? 'checked' : ''/>
                        <p class='text-[0.875rem] tracking-wide'>${subtask.title}</p>
                    </div>`
                ))}
           </div>
        </div>
        <div class='flex flex-col gap-[0.5rem]'>
            <h6 class='text-[0.875rem] font-semibold tracking-wide'>Current Status</h6>
            <p class='p-[0.5rem] border border-[rgb(130,143,163,25%)] rounded-lg'>${status}</p>
        </div>
    </div>
    `
    return cardModal;
}; 