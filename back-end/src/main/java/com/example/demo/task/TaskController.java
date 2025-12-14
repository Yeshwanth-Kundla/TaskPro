package com.example.demo.task;

import java.security.Principal;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/tasks")
@CrossOrigin("*")
public class TaskController {
    
    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping
    public Task create(@RequestBody Task task, Principal principal) {
        return service.createTask(task, principal.getName());
    }

    @GetMapping
    public List<Task> getTasks(Principal principal) {
        return service.getTasks(principal.getName());
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @RequestBody Task task, Principal principal) {
        return service.updateTask(id, task, principal.getName());
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id, Principal principal) {
        service.deleteTask(id, principal.getName());
        return "Task deleted";
    }
}
