package lt.codeacademy.reactprojektas.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.reactprojektas.dto.UserDto;
import lt.codeacademy.reactprojektas.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public void registerNewUser(@Valid @RequestBody UserDto userDto){
        System.out.println(userDto.getUserName());
        userService.registerNewUser(userDto);
    }

//    @GetMapping("/register")
//    public String registrationPageGet(Model model){
//        model.addAttribute("userDto", UserDto.builder().build());
//        return "userRegistration";
//    }
//
//    @PostMapping("/register")
//    public String RegisterNewUser(@Valid UserDto userDto, BindingResult errors){
//        if(errors.hasErrors()){
//            return "userRegistration";
//        }
//        userService.registerNewUser(userDto);
//        return "redirect:/songs";
//    }
}
