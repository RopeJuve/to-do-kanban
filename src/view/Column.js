export const createColumn = ({ name, tasks }) => {
    const columnElement = document.createElement('div');

    const bgColor = {
        'ToDo': 'bg-[#49C4E5]',
        'InProgress': 'bg-[#8471F2]',
        'Done': 'bg-[#67E2AE]'
    };

    columnElement.className = 'w-[280px] flex flex-col gap-[1.5rem]';
    columnElement.id = `column`;
    columnElement.innerHTML = `
  <div class="flex gap-[0.75rem] items-center">
      <div class="w-[15px] h-[15px] rounded-full ${bgColor[name]}"></div>
      <span class="text-white opacity-50 uppercase tracking-widest">${name} (${tasks.length})</span>
  </div>  
  <div id="task-container-${name}" class="flex flex-col gap-[1.25rem]"></div>`;
    return columnElement;
}