package com.example.demo.task;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.user.User;
import com.example.demo.user.UserRepository;

@Service
public class TaskService {
    
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    
    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public Task createTask(Task task,String username){
        User user=userRepository.findByUsername(username).orElseThrow();
        task.setUser(user);
        return taskRepository.save(task);
    }

    public List<Task> getTasks(String username){
        User user=userRepository.findByUsername(username).orElseThrow();
        return taskRepository.findByUserId(user.getId());
    }

    public Task updateTask(Long id,Task updateTask,String username){
        User user=userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found: " + username));

        Task existing=taskRepository.findById(id).orElseThrow();

        if(!existing.getUser().getId().equals(user.getId())){
            throw new RuntimeException("Not allowed");
        }

        existing.setTitle(updateTask.getTitle());
        existing.setDescription(updateTask.getDescription());
        existing.setDeadline(updateTask.getDeadline());
        existing.setPriority(updateTask.getPriority());

        return taskRepository.save(existing);
    }

    public void deleteTask(Long id,String username){
        User user=userRepository.findByUsername(username).orElseThrow();

        Task exsisting=taskRepository.findById(id).orElseThrow();

        if(!exsisting.getUser().getId().equals(user.getId())){
            throw new RuntimeException("Not allowed");
        }
        taskRepository.delete(exsisting);
    }

}
