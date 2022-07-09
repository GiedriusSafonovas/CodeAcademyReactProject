package lt.codeacademy.reactprojektas.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SongDtoGet {

    private Long id;

    private String songName;

    private String playtime;

    private String authorString;

    private String albumString;

//    private Set<Album> albumList;
//
//    private List<Author> authorList;
}
