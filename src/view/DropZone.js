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
        e.preventDefault();
        dropZone.classList.remove('h-[4rem]', 'm-[0.5rem]', 'bg-[#2B2C37]', 'border-dashed', 'border-[2px]', 'border-[#635FC7]', 'animate-pulse');
        dropZone.classList.add('h-[1.5rem]');
        const columnElement = dropZone.closest('.column');
        console.log(columnElement);
        const columnName = columnElement.id;
        const cardId = Number(e.dataTransfer.getData('text/plain'));
        const card = document.getElementById(cardId);
        const dropZones = Array.from(columnElement.querySelectorAll('#drop-zone'));
        console.log(dropZones);
        const dropZoneIndex = dropZones.indexOf(dropZone);
        console.log(dropZoneIndex);
        const insertAfter = dropZone.parentElement.classList.contains('.card') ? dropZone.parentElement : dropZone;
        if (card.contains(dropZone)) {
            return;
        }
        insertAfter.parentElement.after(card);
        const { content } = KanbanAPI.getTask(cardId);
        const newContent = {
            ...content,
            status: columnName,
        };
        KanbanAPI.updateTask(cardId, { status: columnName, position: dropZoneIndex, content: newContent });
        window.location.reload();
    });
    return dropZone;
}