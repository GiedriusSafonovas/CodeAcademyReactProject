package lt.codeacademy.thymeleafprojektas;

import lt.codeacademy.thymeleafprojektas.model.Author;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class test {
    public static void main(String[] args) {
        String authors = "vienas; du; trys trys ";
        Author author;
        String [] authorarr = authors.split(";");
        List<Author> authorlist = Arrays.stream(authorarr).map(a -> Author.builder().name(a.strip()).build()).collect(Collectors.toList());
//        authorlist.stream().forEach(a -> System.out.print(a));

        System.out.println(authorlist);
        String authorListString = authorlist.stream().map(Author::getName).reduce("", String::concat);
        System.out.println(authorListString);
    }
}
