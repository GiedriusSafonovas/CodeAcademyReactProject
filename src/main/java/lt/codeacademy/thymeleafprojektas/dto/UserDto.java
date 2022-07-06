package lt.codeacademy.thymeleafprojektas.dto;

import lombok.Builder;
import lombok.Data;
import lt.codeacademy.thymeleafprojektas.validation.PasswordCompare;
import lt.codeacademy.thymeleafprojektas.validation.UniqueUsername;

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
