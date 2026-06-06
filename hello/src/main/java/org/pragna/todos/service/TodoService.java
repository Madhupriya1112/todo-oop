package org.pragna.todos.service;

import org.pragna.todos.model.Todo;
import org.springframework.stereotype.Service;
import java.nio.file.Path;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    private static final Path DAT_FILE_PATH = Path.of("data/todos.json");
    private final ObjectMapper mapper = new ObjectMapper();

    public TodoService() {
    }

    public List<Todo> getAllTodos() {
        try {
            if (DAT_FILE_PATH.toFile().exists()) {
                Todo[] todos = mapper.readValue(DAT_FILE_PATH.toFile(), Todo[].class);
                return new ArrayList<>(Arrays.asList(todos));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    

    public void addTodo(Todo todo) {
        List<Todo> todos = loadAllTodos();
        todos.add(todo);
        saveAllTodos(todos);
    }

    public void updateTodo(int id, Todo updatedTodo) {
        List<Todo> todos = loadAllTodos();
        Optional<Todo> existingTodo = todos.stream()
                .filter(t -> t.getId() == id)
                .findFirst();

        if (existingTodo.isPresent()) {
            Todo todo = existingTodo.get();
            todo.setTitle(updatedTodo.getTitle());
            todo.setDescription(updatedTodo.getDescription());
            todo.setCompleted(updatedTodo.isCompleted());
        }
        saveAllTodos(todos);
    }

    public void deleteTodo(int id) {
        List<Todo> todos = loadAllTodos();
        todos.removeIf(t -> t.getId() == id);
        saveAllTodos(todos);
    }

    private List<Todo> loadAllTodos() {
        try {
            if (DAT_FILE_PATH.toFile().exists()) {
                Todo[] todos = mapper.readValue(DAT_FILE_PATH.toFile(), Todo[].class);
                return new ArrayList<>(Arrays.asList(todos));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    private void saveAllTodos(List<Todo> todos) {
        try {
            DAT_FILE_PATH.toFile().getParentFile().mkdirs();
            mapper.writerWithDefaultPrettyPrinter().writeValue(DAT_FILE_PATH.toFile(), todos);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
