package com.example.demo.user;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImp implements UserDetailsService {

   private final UserRepository repo;

   public UserDetailsServiceImp(UserRepository repo){
    this.repo=repo;
   }
   
   @Override
   public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    com.example.demo.user.User user=repo.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("User not found" + username));

        return User.withUsername(user.getUsername())
                    .password(user.getPassword())
                    .roles("USER")
                    .build();
    }

}