package lt.codeacademy.reactprojektas.validation;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.reactprojektas.service.UserService;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@RequiredArgsConstructor
public class UsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    private final UserService userService;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return userService.getUserByNameOptional(value).isEmpty();
    }
}
