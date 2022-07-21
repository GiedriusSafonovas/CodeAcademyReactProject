package lt.codeacademy.reactprojektas.service;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.reactprojektas.Repository.AuthorRepository;
import lt.codeacademy.reactprojektas.model.Author;
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

    public void addAuthor(Author author) {
        authorRepository.save(author);
    }
}
