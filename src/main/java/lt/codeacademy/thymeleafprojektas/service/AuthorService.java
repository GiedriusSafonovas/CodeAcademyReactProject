package lt.codeacademy.thymeleafprojektas.service;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.thymeleafprojektas.Repository.AuthorRepository;
import lt.codeacademy.thymeleafprojektas.model.Author;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthorService {

    private final AuthorRepository authorRepository;

    public Optional<Author> getAuthorByName(String authorName){
        return authorRepository.findAuthorByName(authorName);
    }

    public Author getAuthorById(Long id){
        return authorRepository.findById(id).orElseThrow();
    }
}
