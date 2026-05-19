package org.pragna.todos.service;

import org.pragna.todos.model.Todo;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    private List<Todo> todos = new ArrayList<>();
    private int nextId = 1;

    public TodoService() {
        // Initialize with sample data
        todos.add(new Todo(nextId++, "Learn Java", "Study Java basics and OOP", false));
        todos.add(new Todo(nextId++, "Build Todo App", "Create a full-stack todo application", true));
    }

    public List<Todo> getAllTodos() {
        return new ArrayList<>(todos);
    }

    public Todo getTodoById(int id) {
        return todos.stream()
                .filter(t -> t.getId() == id)
                .findFirst()
                .orElse(null);
    }

    public void addTodo(Todo todo) {
        todo.setId(nextId++);
        todos.add(todo);
    }

    public void updateTodo(int id, Todo updatedTodo) {
        Optional<Todo> existingTodo = todos.stream()
                .filter(t -> t.getId() == id)
                .findFirst();
        
        if (existingTodo.isPresent()) {
            Todo todo = existingTodo.get();
            todo.setTitle(updatedTodo.getTitle());
            todo.setDescription(updatedTodo.getDescription());
            todo.setCompleted(updatedTodo.isCompleted());
        }
    }

    public void deleteTodo(int id) {
        todos.removeIf(t -> t.getId() == id);
    }

    public void clearAllTodos() {
        todos.clear();
    }
}
