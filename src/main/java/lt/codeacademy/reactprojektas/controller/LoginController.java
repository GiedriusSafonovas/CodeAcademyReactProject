package lt.codeacademy.reactprojektas.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.reactprojektas.dto.LoginResponseDto;
import lt.codeacademy.reactprojektas.model.User;
import lt.codeacademy.reactprojektas.security.JwtProvider;
import lt.codeacademy.reactprojektas.security.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    private final AuthenticationManager authenticationManager;

    private final JwtProvider jwtProvider;

    @PostMapping
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequest loginRequest) throws Exception{
        return Optional.of(authenticate(loginRequest.getUsername(), loginRequest.getPassword()))
                .map(auth -> (User) auth.getPrincipal())
                .map(principal -> ok(LoginResponseDto.of(
                        loginRequest.getUsername(),
                        jwtProvider.getToken(principal),
                        getRoles(principal)
                )))
                .orElseThrow(() -> new BadCredentialsException("Authentication failed"));
    }

    private Authentication authenticate(String username, String password){
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }

    private Set<String> getRoles(User user){
        return user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());
    }
}
