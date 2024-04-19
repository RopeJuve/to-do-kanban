

export const createCard = (task) => {
  const { content, id } = task;
  const { title, subTasks } = content;
  const completedSubTasks = subTasks.filter((subTask) => subTask.content.isCompleted).length;
  const card = document.createElement('div');
  card.dataset.id = id;
  card.draggable = true;
  card.className = 'px-[1rem] py-[1.5rem] bg-[#2B2C37] rounded-[0.5rem] cursor-pointer hover:bg-[#3A3B4A] transition-all duration-300 ease-in-out';
  card.innerHTML = `
    <h2 class="text-white font-[600] tracking-wide mb-[0.5rem] pointer-events-none">
        ${title}
    </h2>
    <span class="text-white opacity-50 text-[0.875rem] pointer-events-none"
      >${completedSubTasks} of ${subTasks.length} subtasks</span
    >`;

  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", id);
    console.log("dragstart", id);
  });
  card.addEventListener("dragend", (e) => {
    console.log("dragend", id);
  });
  return card;
}