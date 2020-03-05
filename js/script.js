let completedTodos = localStorage.getItem("completedTodos");
let inCompletedTodos = localStorage.getItem("inCompletedTodos");

if (completedTodos != null) {
  completedTodos = JSON.parse(completedTodos);
} else {
  completedTodos = [];
}

if (inCompletedTodos != null) {
  inCompletedTodos = JSON.parse(inCompletedTodos);
} else {
  inCompletedTodos = [];
}

function createTodo() {
  // Prepare todo object

  if (input.value == "") {
    return alert("Ingresa los datos primeros");
  }

  const todo = {
    id: new Date().getTime(),
    message: input.value,
    completed: false,
    date: new Date().toDateString()
  };

  // Insert todo to array

  inCompletedTodos.push(todo);
  localStorage.setItem("inCompletedTodos", JSON.stringify(inCompletedTodos));

  // print todos
  showIncompletedTodos();
  toggleView();

  input.value = "";
}

function showIncompletedTodos() {
  // Clean tbody
  tbody.innerHTML = "";

  for (const todo of inCompletedTodos) {
    tbody.innerHTML += `
        <tr>
            <td>${todo.message}</td>
            <td>${todo.date}</td>
            <td>
                <label>
                    <input type="checkbox" class="filled-in" onchange="completeTodo(${todo.id})"/>
                    <span></span>
                </label>
            </td>
        </tr>
    `;
  }
}

function completeTodo(id) {
  // search todo and move to completed array

  const completedTodo = inCompletedTodos.find(t => t.id === id);

  completeTodo.completed = true;
  completedTodos.push(completedTodo);

  inCompletedTodos = inCompletedTodos.filter(t => t.id !== id);

  localStorage.setItem("inCompletedTodos", JSON.stringify(inCompletedTodos));
  localStorage.setItem("completedTodos", JSON.stringify(completedTodos));

  showIncompletedTodos();
  toggleView();
}

function showCompletedTodos() {
  table.style.display = "inline-table";
  for (const todo of completedTodos) {
    tbody.innerHTML += `
        <tr>
            <td>${todo.message}</td>
            <td>${todo.date}</td>
            <td>
                <label>
                    <input type="checkbox" class="filled-in" checked/>
                    <span></span>
                </label>
            </td>
        </tr>
    `;
  }
}

function toggleView() {
  if (inCompletedTodos.length == 0) {
    table.style.display = "none";
    textDisplay.style.display = "block";
  } else {
    table.style.display = "inline-table";
    textDisplay.style.display = "none";
  }
}

btnSave.onclick = createTodo;
btnCompleteTodos.onclick = showCompletedTodos;
btnClear.onclick = function() {
  localStorage.clear("completedTodos");
  window.location.reload();
};

window.onload = function() {
  showIncompletedTodos();
  toggleView();
};
