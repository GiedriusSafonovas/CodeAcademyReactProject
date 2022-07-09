package lt.codeacademy.reactprojektas.dto;

import lombok.Builder;
import lombok.Data;
import lt.codeacademy.reactprojektas.validation.PasswordCompare;
import lt.codeacademy.reactprojektas.validation.UniqueUsername;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@PasswordCompare
public class UserDto {

    @NotBlank(message = "{validate.blank}")
    @UniqueUsername
    private String userName;

    @NotBlank(message = "{validate.blank}")
    private String password;

    @NotBlank(message = "{validate.blank}")
    private String repeatedPassword;
}
