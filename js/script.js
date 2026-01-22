// Temporary storage for todo items
let todos = [];
let filterStatus = "all";
renderTodos();

const sortBtn = document.getElementById("sortBtn");
const sortMenu = document.getElementById("sortMenu");

sortBtn.addEventListener("click", () => {
  sortMenu.classList.toggle("hidden");
});

function applyFilter(status) {
  filterStatus = status;     // set filter
  sortMenu.classList.add("hidden"); // tutup dropdown
  renderTodos();          // render ulang
}

// Function to add a new todo item
function addTodo() {
    const todoInput = document.getElementById('todo-input').value;
    const todoDate = document.getElementById('todo-date').value;

    if (todoInput === '' || todoDate === '') {
        alert('Please enter both a todo item and a due date.');
    } else {
        const newTodo = {
            todo: todoInput,
            date: todoDate,
            completed: false,
        };

        todos.push(newTodo);

        document.getElementById('todo-input').value = '';
        document.getElementById('todo-date').value = '';

        // Re-render the todo list
        renderTodos();

    }
}

// Function to render the todo list
function renderTodos() {
      const table = document.getElementById("todo-list");
      table.innerHTML = "";

      // COPY data asli
        let filteredTodos = [...todos];

        // FILTER BERDASARKAN STATUS
        if (filterStatus === "completed") {
            filteredTodos = filteredTodos.filter(todo => todo.completed);
        }

        if (filterStatus === "pending") {
            filteredTodos = filteredTodos.filter(todo => !todo.completed);
        }

      if (filteredTodos.length === 0) {
        table.innerHTML = `
          <tr>
            <td colspan="4" class="text-center py-10 text-gray-500">
              No tasks found
            </td>
          </tr>
        `;
        return;
      }

      filteredTodos.forEach((todo, index) => {
        table.innerHTML += `
          <tr class="border-t border-white/20">
            <td class="px-6 py-4 text-white text-center">${todo.todo}</td>
            <td class="px-6 py-4 text-white text-center">${todo.date}</td>
            <td class="px-6 py-4 text-center">
              <span class="px-3 py-1 rounded-full text-xs font-medium
                ${todo.completed
                  ? 'bg-green-500 text-white'
                  : 'bg-yellow-500 text-white'}">
                ${todo.completed ? 'Completed' : 'Pending'}
              </span>
            </td>
            <td class="px-6 py-4 space-x-2 text-center">
              <button
                class="px-1 py-1 rounded-sm bg-yellow-500" onclick="editTodo(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56"/><path d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.36 1.36 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.36 1.36 0 0 1-.953.395H8.197a1.36 1.36 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086"/></g></svg>
              </button>
              <button
                class="text-white px-1 py-1 rounded-sm bg-red-500" onclick="deleteTodo(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24"><path fill="#fff" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"/></svg>
              </button>
              <button
                class="text-white px-1 py-1 rounded-sm bg-green-500" onclick="completedTodo(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24"><path fill="#fff" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z"/></svg>
              </button>
            </td>
          </tr>
        `;
      });
    }

// Function to delete all todo items
function deleteAllTodo() {
    todos = [];

    // Re-render the todo list
    renderTodos();
}

// function delete
function deleteTodo(index) {
    if (!confirm("Yakin ingin menghapus todo ini?")) return;

    // Delete Todo
    todos.splice(index,1);

    // Re-render the todo list
    renderTodos();
}

// function complete
function completedTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}


// function edit
const editTodo = (index) => {
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');

    todoInput.value = todos[index].todo
    todoDate.value = todos[index].date

    todos.splice(index, 1);
    renderTodos();
}


