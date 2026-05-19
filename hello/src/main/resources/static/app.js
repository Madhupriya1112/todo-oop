const API_BASE_URL = '/api/todos';

document.addEventListener('DOMContentLoaded', loadTodos);

async function loadTodos() {
    try {
        const response = await fetch(API_BASE_URL);
        const todos = await response.json();
        displayTodos(todos);
    } catch (error) {
        console.error('Error loading todos:', error);
        alert('Failed to load todos');
    }
}


function displayTodos(todos) {
    const todoList = document.getElementById('todoList');
    
    if (todos.length === 0) {
        todoList.innerHTML = '<div class="empty-message">No todos yet. Add one to get started!</div>';
        return;
    }

    todoList.innerHTML = todos.map(todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}">
            <div class="todo-content">
                <div class="todo-title">${escapeHtml(todo.title)}</div>
                <div class="todo-description">${escapeHtml(todo.description)}</div>
            </div>
            <div class="todo-actions">
                <button class="todo-btn toggle-btn" onclick="toggleTodo(${todo.id}, ${!todo.completed})">
                    ${todo.completed ? 'Undo' : 'Done'}
                </button>
                <button class="todo-btn delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        </li>
    `).join('');
}


async function addTodo() {
    const title = document.getElementById('todoTitle').value.trim();
    const description = document.getElementById('todoDescription').value.trim();

    if (!title) {
        alert('Please enter a todo title');
        return;
    }

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                description: description,
                completed: false
            })
        });

        if (response.ok) {
            document.getElementById('todoTitle').value = '';
            document.getElementById('todoDescription').value = '';
            loadTodos();
        } else {
            alert('Failed to add todo');
        }
    } catch (error) {
        console.error('Error adding todo:', error);
        alert('Failed to add todo');
    }
}


async function toggleTodo(id, completed) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                completed: completed
            })
        });

        if (response.ok) {
            loadTodos();
        } else {
            alert('Failed to update todo');
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        alert('Failed to update todo');
    }
}


async function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this todo?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadTodos();
            } else {
                alert('Failed to delete todo');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
            alert('Failed to delete todo');
        }
    }
}


async function clearAll() {
    if (confirm('Are you sure you want to delete ALL todos? This cannot be undone.')) {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadTodos();
            } else {
                alert('Failed to clear todos');
            }
        } catch (error) {
            console.error('Error clearing todos:', error);
            alert('Failed to clear todos');
        }
    }
}


function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
