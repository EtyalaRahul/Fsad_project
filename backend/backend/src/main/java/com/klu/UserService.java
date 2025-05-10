package com.klu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public User saveUser(User user) {
        // Check if user already exists
        if (userRepository.findById(user.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists with email: " + user.getEmail());
        }
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmailAndPassword(email, password);
        if (user == null) {
            throw new RuntimeException("Invalid email or password");
        }
        return user;
    }

    public User findByEmail(String email) {
        return userRepository.findById(email)
            .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
}