package lt.codeacademy.reactprojektas.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
//@PasswordCompare
public class UserDto {

//    @NotBlank(message = "{validate.blank}")
//    @UniqueUsername
    private String userName;

//    @NotBlank(message = "{validate.blank}")
    private String password;

//    @NotBlank(message = "{validate.blank}")
//    private String repeatedPassword;
}
