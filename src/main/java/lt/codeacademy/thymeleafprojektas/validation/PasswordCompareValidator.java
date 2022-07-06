package lt.codeacademy.thymeleafprojektas.validation;

import lt.codeacademy.thymeleafprojektas.dto.UserDto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordCompareValidator implements ConstraintValidator<PasswordCompare, UserDto> {

    @Override
    public boolean isValid(UserDto value, ConstraintValidatorContext context) {
        return value.getPassword().equals(value.getRepeatedPassword());
    }
}
