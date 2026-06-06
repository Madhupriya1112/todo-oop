package org.pragna.todos.controller;

import java.util.List;

import org.pragna.todos.model.Todo;
import org.pragna.todos.service.TodoService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")

public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }
   
    @GetMapping({"/"})
    public List<Todo> getTodos() {
      return todoService.getAllTodos();
    }

    @PostMapping({"/add"})
    public void addTodo(@RequestBody Todo todo) {
        todoService.addTodo(todo);
        
    }
    @PutMapping({"/update/{id}"})
    public void updateTodo(@PathVariable int id, @RequestBody Todo updatedTodo) {
        todoService.updateTodo(id, updatedTodo);
    }
    @DeleteMapping({"/delete/{id}"})
    public void deleteTodo(@PathVariable int id) {
        todoService.deleteTodo(id);
    }
    }