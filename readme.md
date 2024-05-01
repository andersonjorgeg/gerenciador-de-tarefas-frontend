# Front-end do Gerenciador de Tarefas

Este é o componente de front-end da aplicação Gerenciador de Tarefas, construído usando JavaScript e Tailwind CSS.

## Funcionalidades

- Exibir uma lista de tarefas
- Criar uma nova tarefa
- Marcar uma tarefa como concluída
- Excluir uma tarefa

## Tecnologias Utilizadas

- JavaScript
- Tailwind CSS

## Como Começar

1. Certifique-se de que o servidor de API back-end esteja em execução. O front-end espera que o back-end esteja disponível em `http://localhost:3000/api/tasks`.
2. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/gerenciador-de-tarefas-frontend.git
   ```
3. Acesse o diretório do front-end:
   ```
   cd frontend
   ```
4. Abra o arquivo `index.html` no seu navegador web preferido.

## Estrutura de Arquivos

```
gerenciador-de-tarefas-frontend/
├── index.html
├── tasks-manager.js
└── dom-manipulation.js
```

- `index.html`: O arquivo HTML principal que serve como o ponto de entrada da aplicação de front-end.
- `tasks-manager.js`: Contém a lógica para interagir com a API de back-end para buscar, criar, atualizar e excluir tarefas.
- `dom-manipulation.js`: Lida com a manipulação do DOM para exibir a lista de tarefas e atualizar a interface do usuário com base nas ações do usuário.

## Contribuição

As contribuições são bem-vindas! Se você encontrar quaisquer problemas ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).