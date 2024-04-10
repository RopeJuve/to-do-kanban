export const createCardModal = ({ content, id }) => {
    const { title, description, status, subTasks } = content;
    const cardModal = document.createElement('div');
    cardModal.dataset.id = id;
    cardModal.className = 'fixed inset-0 bg-[rgba(0,0,0,0.5)] px-[1rem] flex justify-center items-center';
    cardModal.innerHTML = `
    <div class='bg-[#2B2C37] p-[1.5rem]'>
        <h1>${title}</h1>
        <p>${description}</p>
        <p>${status}</p>
    </div>
    `
    return cardModal;
}; 