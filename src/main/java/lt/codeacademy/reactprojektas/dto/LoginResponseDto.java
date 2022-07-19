package lt.codeacademy.reactprojektas.dto;

import lombok.Value;

@Value(staticConstructor = "of")
public class LoginResponseDto {

    String username;
    String jwtToken;
    Long jwtTokenExpiresIn;

}
