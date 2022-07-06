package lt.codeacademy.thymeleafprojektas.dto;


import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;


@Data
@Builder
public class SongDtoPost {

    private Long id;

    @NotBlank(message = "{validate.blank}")
    private String songName;

    @NotBlank(message = "{validate.blank}")
    private String playtime;

    @NotBlank(message = "{validate.blank}")
    private String authorString;

    @NotBlank(message = "{validate.blank}")
    private String albumString;
}
