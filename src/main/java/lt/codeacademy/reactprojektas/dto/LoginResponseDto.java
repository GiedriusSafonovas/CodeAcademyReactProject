package lt.codeacademy.reactprojektas.dto;

import lombok.Value;

import java.util.Set;

@Value(staticConstructor = "of")
public class LoginResponseDto {

    String username;
    String jwtToken;
    Set<String> roles;

}
