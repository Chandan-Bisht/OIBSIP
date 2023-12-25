// todo setting
const task_input = document.querySelector("input");
const date_input = document.querySelector(".schedule-date"); //adding date input
const add_btn = document.querySelector(".add-task");
const todos_list_body = document.querySelector(".todos-list-body");
const alert_message = document.querySelector(".alert-message");
const delete_all_btn = document.querySelector(".delete-all-btn");
const filter_btn = document.querySelector(".filter-btn");

// Todo list main code

let todos = JSON.parse(localStorage.getItem("todos")) || [];

window.addEventListener("DOMContentLoaded", () => {
    if (!todos.length) {
        displayTodos([]);
    } else {
        showAllTodos();
    }
});

// get random unique id
function getRandomId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

function addToDo(task_input, date_input) {
    let task = {
        id: getRandomId(),
        task: task_input.value.length > 14 ? task_input.value.slice(0, 14) + "..." : task_input.value,
        dueDate: date_input.value,
        completed: false,
    };
    todos.push(task);
    console.log(todos)
}

task_input.addEventListener("keyup", (e) => {
    if(e.code === 13 && task_input.value.length > 0){
        addToDo(task_input, date_input);
        saveToLocalStorage();
        task_input.value = "";
        showAllTodos();
    }
})

add_btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (task_input.value === "") {
        showAlertMessage("Please enter a task", "error");
    } else {
        addToDo(task_input, date_input);
        saveToLocalStorage();
        showAllTodos();
        task_input.value = "";
        date_input.value = "";
        showAlertMessage("Task added successfully", "success");
    }
})

delete_all_btn.addEventListener("click", clearAllTodos);

function toggleDropDown() {
    dropdownContent.classList.toggle("visible");
    if(dropdownContent.classList.contains("visible")) {
        window.onclick = function (e) {
            if (e.target !== filter_btn) {
                dropdownContent.classList.remove("visible");
            }
        }
    }
}

filter_btn.addEventListener("click", () => {
    toggleDropDown();
})

// show all todos

function showAllTodos() {
    todos_list_body.innerHTML = "";
    if (todos.length === 0) {
        todos_list_body.innerHTML = `<tr><td colspan="5" class="text-center">No task found</td></tr>`;
        return;
    }

    todos.forEach(todo => {
        todos_list_body.innerHTML += `
            <tr class="todo-item" data-id="${todo.id}">
                <td>${todo.task}</td>
                <td>${todo.dueDate || "No due date"}</td>
                <td>${todo.completed ? "Completed" : "Pending"}</td>
                <td>
                    <button class="btn-warning" onclick="editTodo('${todo.id}')">
                        <i class="bx bx-edit-alt bx-xs"></i>
                    </button>
                    <button class="btn-success" onclick="toggleStatus('${todo.id}')">
                        <i class="bx bx-check bx-xs"></i>
                    </button>
                    <button class="btn-error" onclick="deleteTodo('${todo.id}')">
                        <i class="bx bx-trash bx-xs"></i>
                    </button>
                </td>
            </tr>
        `
    });
}

// function to retrieve tasks from local storage
function getTasks() {
    return JSON.parse(localStorage.getItem(todos)) || [];
}

// save todos to local storage
function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlertMessage(message, type) {
    let alert_box = `
        <p class="alert-${type}">${message}</p>
    `
    alert_message.innerHTML = alert_box;
    alert_message.classList.remove("hide");
    alert_message.classList.add("show");
    switch(type) {
        case "error":
            alert_message.style.backgroundColor = "#f97372";
            break;
        case "success":
            alert_message.style.backgroundColor = "#36d399";
    }
    setTimeout(() => {
        alert_message.classList.remove("show");
        alert_message.classList.add("hide");
    }, 3000);
}

// delete todo
function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveToLocalStorage();
    showAlertMessage("Todo deleted successfully", "success");
    showAllTodos();
}

// edit todo
function editTodo(id) {
    let todo = todos.find((todo) => todo.id === id);
    task_input.value = todo.task;
    date_input.value = todo.dueDate;
    todos = todos.filter((todo) => todo.id !== id);
    add_btn.innerHTML = "<i class='bx bx-check bx-sm'></i>"
    saveToLocalStorage();
    add_btn.addEventListener("click", () => {
        add_btn.innerHTML = "<i class='bx bx-plus bx-sm'></i>";
        showAlertMessage("Todo updated successfully", "success");
    })
}

function clearAllTodos() {
    if(todos.length > 0) {
        todos = [];
        saveToLocalStorage();
        showAlertMessage("All todos cleared successfully", "success");
        showAllTodos();
    } else {
        showAlertMessage("No todos to clear", "error");
    }
}

function toggleStatus(id) {
    let todo = todos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    // console.log("todo", todo);
    displayTodos(todos);
    saveToLocalStorage();
}

function filterTodos(status) {
    let filteredTodos;
    switch(status) {
        case "all":
            filteredTodos = todos;
            break;
        case "pending":
            filteredTodos = todos.filter((todo) => !todo.completed);
            break;
        case "completed":
            filteredTodos = todos.filter((todo) => todo.completed);
            break;
    }
    console.log(filteredTodos)
    displayTodos(filteredTodos);
}

function displayTodos(todosArray) {
    todos_list_body.innerHTML = "";
    if(todosArray.length === 0) {
        todos_list_body.innerHTML = `<tr><td colspan="5" class="text-center">No task found</td></tr>`;
        return;
    }
    // console.log(todosArray)
    todosArray.forEach((todo) => {
        const status = todo.completed ? "Completed" : "Pending";
        todos_list_body.innerHTML += `
            <tr class="todo-item" data-id="${todo.id}">
                <td>${todo.task}</td>
                <td>${todo.dueDate || "No due date"}</td>
                <td>${status}</td>
                <td>
                    <button class="btn-warning" onclick="editTodo('${todo.id}')">
                        <i class="bx bx-edit-alt bx-xs"></i>
                    </button>
                    <button class="btn-success" onclick="toggleStatus('${todo.id}')">
                        <i class="bx bx-check bx-xs"></i>
                    </button>
                    <button class="btn-error" onclick="deleteTodo('${todo.id}')">
                        <i class="bx bx-trash bx-xs"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}