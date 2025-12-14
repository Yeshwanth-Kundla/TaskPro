package com.example.demo.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.security.JwtUtil;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;

@Service
public class AuthService {
    
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;


    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authManager,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
    }

     public void register(RegisterRequest request){
        if(userRepository.findByUsername(request.getUsername()).isPresent()){
            throw new RuntimeException("Username already exists");
        }

        User user=new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
     }

     public String login(LoginRequest request){
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        return jwtUtil.generateToken(request.getUsername());
     }
}
