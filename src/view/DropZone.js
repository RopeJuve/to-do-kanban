import KanbanAPI from "../api/KanbanApi.js";

export const createDropZone = () => {
    const dropZone = document.createElement('div');
    dropZone.id = 'drop-zone';
    dropZone.className = 'h-[1.5rem] w-[calc(100% - 1rem)] transition-[height] duration-300 rounded-lg';

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.remove('h-[1.5rem]');
        dropZone.classList.add('h-[4rem]', 'm-[0.5rem]', 'bg-[#2B2C37]', 'border-dashed', 'border-[2px]', 'border-[#635FC7]', 'animate-pulse');
    });
    dropZone.addEventListener('dragleave', (e) => {
        dropZone.classList.remove('h-[4rem]', 'm-[0.5rem]', 'bg-[#2B2C37]', 'border-dashed', 'border-[2px]', 'border-[#635FC7]', 'animate-pulse');
        dropZone.classList.add('h-[1.5rem]');
    });

    dropZone.addEventListener('drop', (e) => {
        
        dropZone.classList.remove('h-[4rem]', 'm-[0.5rem]', 'bg-[#2B2C37]', 'border-dashed', 'border-[2px]', 'border-[#635FC7]', 'animate-pulse');
        dropZone.classList.add('h-[1.5rem]');
        const columnElement = dropZone.closest('.column');
        const columnName = columnElement.id;
        console.log(columnElement)
        const dropZoneIndex = Array.from(columnElement.children).indexOf(dropZone);
        console.log(dropZoneIndex);
        const cardId = Number(e.dataTransfer.getData('text/plain'));
        console.log(cardId);
        const card = document.getElementById(cardId);
        const insertAfter = dropZone.parentElement.classList.contains('.card') ? dropZone.parentElement : dropZone;
        if (card.contains(dropZone)) {
            return;
        }
        insertAfter.parentElement.after(card);
        KanbanAPI.updateTask(cardId, { status: columnName, position: dropZoneIndex });
        window.location.reload();
    });
    return dropZone;
}