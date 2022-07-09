package lt.codeacademy.reactprojektas.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.reactprojektas.model.Author;
import lt.codeacademy.reactprojektas.service.AuthorService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequiredArgsConstructor
public class AuthorControler {

    private final AuthorService authorService;

    @GetMapping("/author/{id}")
    public String getAuthor(Model model, @PathVariable Long id){
        Author author = authorService.getAuthorById(id);
        model.addAttribute("author", author);
        return "author";
    }

}
