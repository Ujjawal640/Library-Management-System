package com.example.library.controller;

import com.example.library.model.Role;
import com.example.library.model.User;
import com.example.library.repository.UserRepository;
import com.example.library.security.JwtUtil;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private  UserRepository userRepository;

    @Autowired
    private  PasswordEncoder passwordEncoder;

    @Autowired
    private  JwtUtil jwtUtil;



    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto dto) {
        System.out.println("testing ");
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
        }
        User u = User.builder()
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .name(dto.getName())
                .role(Role.ROLE_MEMBER)
                .build();
        userRepository.save(u);
        return ResponseEntity.ok(Map.of("message", "registered"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto dto) {
        var userOpt = userRepository.findByEmail(dto.getEmail());
        if (userOpt.isEmpty()) return ResponseEntity.status(401).body(Map.of("error","invalid_credentials"));
        User user = userOpt.get();
        System.out.println(user.toString());
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error","invalid_credentials"));
        }
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(Map.of("accessToken", token));
    }

    @GetMapping("/members")
    public ResponseEntity<?> getMembers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        PageRequest pageable = PageRequest.of(page, size);
        var membersPage = userRepository.findAllByRole(Role.ROLE_MEMBER, pageable);

        var memberDtos = membersPage.getContent()
                .stream()
                .map(u -> new UserDto(u.getId(), u.getEmail(), u.getName(), u.getRole()))
                .toList();

        return ResponseEntity.ok(Map.of(
                "members", memberDtos,
                "currentPage", membersPage.getNumber(),
                "totalPages", membersPage.getTotalPages(),
                "totalMembers", membersPage.getTotalElements()
        ));
    }

    @Data static class RegisterDto { private String email; private String password; private String name; }
    @Data static class LoginDto { private String email; private String password; }
    @Data
    @AllArgsConstructor
    public static class UserDto {
        private Long id;
        private String email;
        private String name;
        private Role role;
    }

}
