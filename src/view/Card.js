

export const createCard = (task) => {
  const { content, id } = task;
  const { title, subTasks } = content;
  const completedSubTasks = subTasks.filter((subTask) => subTask.completed).length;
  const card = document.createElement('div');
  card.dataset.id = id;
  card.className = 'px-[1rem] py-[1.5rem] bg-[#2B2C37] rounded-[0.5rem]';
  card.innerHTML = `
    <h2 class="text-white font-[600] tracking-wide mb-[0.5rem]">
        ${title}
    </h2>
    <span class="text-white opacity-50 text-[0.875rem]"
      >${completedSubTasks} of ${subTasks.length} subtasks</span
    >`;
  return card;
}