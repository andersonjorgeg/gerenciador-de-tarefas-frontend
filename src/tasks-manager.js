/**
 * Busca a lista de tarefas do servidor.
 *
 * @returns {Promise} Uma promessa que é resolvida com a lista de tarefas.
 * @throws {Error} Se o servidor não retornar uma lista de tarefas.
 */
export async function fetchTasks() {
  const response = await fetch('http://localhost:3000/api/tasks');
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Erro ao buscar as tarefas');
  }
}

/**
 * Cria uma nova tarefa no servidor.
 *
 * @param {string} title - O título da tarefa.
 * @returns {Promise} Uma promessa que é resolvida com a resposta do servidor.
 * @throws {Error} Se o servidor não retornar uma resposta positiva.
 */
export async function addTask(title) {
  const response = await fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar a tarefa');
  }

  return response.json();
}

/**
 * Deleta uma tarefa no servidor.
 *
 * @param {number} id - O ID da tarefa a ser deletada.
 * @returns {Promise} Uma promessa que é resolvida com a resposta do servidor.
 * @throws {Error} Se o servidor não retornar uma resposta positiva.
 */
export async function deleteTask(id) {
  const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ id })
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar a tarefa');
  }

  return await response.json();
}


/**
 * Atualiza o status de uma tarefa no servidor.
 *
 * @param {number} taskId - O ID da tarefa a ser atualizada.
 * @param {boolean} completed - O novo status de conclusão da tarefa.
 * @returns {Promise} Uma promessa que é resolvida com a lista de tarefas após a atualização.
 * @throws {Error} Se ocorrer algum erro ao enviar a requisição ou receber a resposta.
 */
export async function completeTask(taskId, completed) {
  try {
    const response = await fetch(`http://localhost:3000/api/tasks/${taskId}/complete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed })
    });

    if (response.ok) {
      console.log('Status da tarefa atualizado com sucesso');
      const tasks = await fetchTasks();
      renderTasksList(tasks);
      return tasks;
    } else {
      throw new Error('Erro ao atualizar o status da tarefa');
    }
  } catch (error) {
    console.error('Erro ao atualizar o status da tarefa:', error);
    throw error;
  }
}
