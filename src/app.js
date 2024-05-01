function fetchTasks() {
    fetch('http://localhost:3000/api/tasks')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao buscar as tarefas');
        })
        .then(tasks => {
            const tasksList = document.getElementById('tasks-list');
            tasksList.innerHTML = ''; 
            tasksList.className = 'flex flex-col gap-6';

            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = 'flex justify-between items-center bg-gray-200 p-4 rounded-lg';

                taskItem.textContent = task.title;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'excluir';
                deleteButton.className = 'bg-red-500 text-white px-4 py-2 rounded-lg';
                deleteButton.addEventListener('click', () => {
                    deleteTask(task.id);
                })

                taskItem.appendChild(deleteButton);
                tasksList.appendChild(taskItem);
            });
        })
        .catch(error => console.error('Erro:', error));
}

function addTask() {
    const input = document.getElementById('task-input');
    const title = input.value.trim();
    if (title !== '') {
        fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao criar a tarefa');
                }
                input.value = ''; // Limpar o campo de entrada após a adição
                fetchTasks(); // Atualizar a lista de tarefas
            })
            .catch(error => console.error('Erro:', error));
    }
}

function deleteTask(id) {
    fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Erro ao deletar a tarefa');
            }
            fetchTasks(); // Atualizar a lista de tarefas
        })
        .catch(error => console.error('Erro:', error));
}

// Chama fetchTasks() quando a página é carregada
document.addEventListener('DOMContentLoaded', fetchTasks);

