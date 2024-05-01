import { fetchTasks, addTask, deleteTask, completeTask } from './tasks-manager.js';

/**
 * Renderiza a lista de tarefas no DOM.
 *
 * @param {Array<Object>} tasks - A lista de tarefas a ser renderizada.
 * @returns {void}
 */
function renderTasksList(tasks) {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';
    tasksList.className = 'flex flex-col gap-6';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'flex justify-between items-center bg-gray-200 p-4 rounded-lg';

        const taskCheckboxAndTitle = document.createElement('div');
        taskCheckboxAndTitle.className = 'flex items-center';

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.checked = task.completed;
        taskCheckbox.className = 'mr-4';

        taskCheckbox.addEventListener('change', () => {
            handleTaskCompletion(task.id, taskCheckbox.checked);
        });

        const taskTitle = document.createElement('span');
        taskTitle.textContent = task.title;

        if (task.completed) {
            taskTitle.className = 'line-through text-gray-400';
        }

        taskCheckboxAndTitle.appendChild(taskCheckbox);
        taskCheckboxAndTitle.appendChild(taskTitle);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'excluir';
        deleteButton.className = 'bg-red-500 text-white px-4 py-2 rounded-lg';

        deleteButton.addEventListener('click', () => {
            handleTaskDeletion(task.id);
        });

        taskItem.appendChild(taskCheckboxAndTitle);
        taskItem.appendChild(deleteButton);
        tasksList.appendChild(taskItem);
    });
}

/**
 * Gerencia a exclusão de uma tarefa.
 *
 * @param {number} taskId - O ID da tarefa a ser excluída.
 */
async function handleTaskDeletion(taskId) {
    try {
        await deleteTask(taskId);
        const tasks = await fetchTasks();
        renderTasksList(tasks);
    } catch (error) {
        console.error('Erro ao deletar a tarefa:', error);
    }
}

/**
 * Gerencia a conclusão de uma tarefa.
 *
 * @param {number} taskId - O ID da tarefa a ser concluída.
 * @param {boolean} completed - O status de conclusão da tarefa.
 */
async function handleTaskCompletion(taskId, completed) {
    try {
        await completeTask(taskId, completed);
        const tasks = await fetchTasks();
        renderTasksList(tasks);
    } catch (error) {
        console.error('Erro ao concluir a tarefa:', error);
    }
}


/**
 * Inicializa a aplicação.
 *
 * Obtém as tarefas do servidor,
 * renderiza a lista de tarefas na tela e
 * adiciona um evento de submit ao formulário de adição de tarefa
 * para criar uma nova tarefa.
 *
 * @returns {Promise} Uma promessa que é resolvida após a inicialização da aplicação.
 */
async function initApp() {
    try {
        const tasks = await fetchTasks();
        renderTasksList(tasks);

        const addTaskForm = document.getElementById('add-task-form');
        addTaskForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const title = document.getElementById('task-input').value.trim();
            if (title) {
                await addTask(title);
                const updatedTasks = await fetchTasks();
                renderTasksList(updatedTasks);
            }
        });
    } catch (error) {
        console.error('Erro ao inicializar a aplicação:', error);
    }
}

document.addEventListener('DOMContentLoaded', initApp);