export default class KanbanAPI {
    static getBoard() {
        return read();
    }
    //Get tasks by column name
    static getTasksByColumn(name) {
        const column = read().find((column) => column.name === name);
        return column.tasks;
    }

    //Add task to column
    static addTaskToColumn(columnName, content) {
        const board = read();
        const column = board.find((column) => column.name === columnName);
        if (content === undefined || Object.keys(content).length === 0) {
            return;
        }
        const task = {
            id: Math.floor(Math.random() * 1000000),
            content: {
                ...content,
            }
        }

        console.log(column, columnName)
        column.tasks.push(task);
        save(board);
    }

    //Get task by id
    static getTask(taskId) {
        const board = read();
        for (const column of board) {
            const item = column.tasks.find((item) => item.id === taskId);
            if (item) {
                return item;
            }
        }
    }

    //update task
    static updateTask(taskId, newContent) {
        const board = read();
        const [item, column] = (() => {
            for (const column of board) {
                const item = column.tasks.find((item) => item.id === taskId);
                if (item) {
                    return [item, column];
                }
            }

        })();

        item.content = newContent.content === undefined ? item.content : newContent.content;
        console.log('For moving item', item, column);
        //move item to another column
        if (newContent.status !== undefined
            && newContent.position !== undefined) {
            const newColumn = board.find((column) => column.name === newContent.status);

            column.tasks.splice(column.tasks.indexOf(item), 1);

            newColumn.tasks.splice(newContent.position, 0, item);
        }
        save(board);
    }

    //delete task
    static deleteTask(taskId) {
        const board = read();
        for (const column of board) {
            const item = column.tasks.find((item) => item.id === taskId);
            if (item) {
                column.tasks.splice(column.tasks.indexOf(item), 1);
            }

        }
        save(board);
    }

    //add subtask
    static addSubtask(taskId, subtask) {
        const board = read();
        for (const column of board) {
            const item = column.tasks.find((item) => item.id === taskId);
            if (item) {
                const task = {
                    id: Math.floor(Math.random() * 1000000),
                    content: subtask
                }
                item.content.subTasks.push(task);
            }
        }
        save(board);
    }

    //update subtask
    static updateSubtask(taskId, subtaskId, newContent) {
        const board = read();
        for (const column of board) {
            const item = column.tasks.find((item) => item.id === taskId);
            if (item) {
                const subtask = item.content.subTasks.find((subtask) => subtask.id === subtaskId);
                if (subtask) {
                    subtask.content.isCompleted = newContent;
                }
            }
        }
        save(board);
    }


}

const read = () => JSON.parse(localStorage.getItem('board')) || [{
    name: 'ToDo',
    tasks: [],
},
{
    name: 'InProgress',
    tasks: [],
},
{
    name: 'Done',
    tasks: [],
}];
const save = (board) => localStorage.setItem('board', JSON.stringify(board));