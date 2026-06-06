const API_URL = "http://localhost:8080/api";
let todos = [];

// FETCH TODOS
async function fetchTodos() {

    const response = await fetch(API_URL + "/");

    todos = await response.json();

    const todoList = document.getElementById("todoList");

    todoList.innerHTML = "";

    todos.forEach(todo => {

        const div = document.createElement("div");

        div.className = "todo-item";

        div.innerHTML = `

            <div class="todo-header">

                <h3 class="${todo.completed ? 'completed' : ''}">
                    ${todo.title}
                </h3>

                <input
                    type="checkbox"
                    ${todo.completed ? "checked" : ""}
                    onchange="toggleCompleted(
                        ${todo.id},
                        '${todo.title}',
                        '${todo.description}',
                        this.checked
                    )"
                >

            </div>

            <p>${todo.description}</p>

            <p>
                Status:
                <span class="${todo.completed ? 'done' : 'pending'}">
                    ${todo.completed ? "Completed" : "Pending"}
                </span>
            </p>

            <button
                class="delete-btn"
                onclick="deleteTodo(${todo.id})"
            >
                Delete
            </button>
        `;

        todoList.appendChild(div);
    });
}



// ADD TODO
async function addTodo() {

    // RANDOM INTEGER ID
    const id = todos.length+1;

    const title = document.getElementById("title").value;

    const description = document.getElementById("description").value;


    const todo = {

        id: id,

        title: title,

        description: description,

        completed: false
    };


    await fetch(API_URL + "/add", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(todo)
    });


    fetchTodos();


    document.getElementById("title").value = "";

    document.getElementById("description").value = "";
}



// UPDATE COMPLETED STATUS
async function toggleCompleted(id, title, description, completed) {

    const updatedTodo = {

        id: id,

        title: title,

        description: description,

        completed: completed
    };


    await fetch(API_URL + "/update/" + id, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(updatedTodo)
    });


    fetchTodos();
}



// DELETE TODO
async function deleteTodo(id) {

    await fetch(API_URL + "/delete/" + id, {

        method: "DELETE"
    });

    fetchTodos();
}


// INITIAL LOAD
fetchTodos();