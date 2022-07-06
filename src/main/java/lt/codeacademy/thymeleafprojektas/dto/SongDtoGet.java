package lt.codeacademy.thymeleafprojektas.dto;

import lombok.Builder;
import lombok.Data;
import lt.codeacademy.thymeleafprojektas.model.Album;
import lt.codeacademy.thymeleafprojektas.model.Author;

import java.util.List;
import java.util.Set;

@Data
@Builder
public class SongDtoGet {

    private Long id;

    private String songName;

    private String playtime;

    private String authorString;

    private String albumString;

    private Set<Album> albumList;

    private List<Author> authorList;
}
