package lt.codeacademy.thymeleafprojektas.mapper;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.thymeleafprojektas.dto.SongDtoPost;
import lt.codeacademy.thymeleafprojektas.model.Album;
import lt.codeacademy.thymeleafprojektas.model.Author;
import lt.codeacademy.thymeleafprojektas.model.Song;
import lt.codeacademy.thymeleafprojektas.service.AlbumService;
import lt.codeacademy.thymeleafprojektas.service.AuthorService;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class SongDtoPostToSongMapper {

    private final AuthorService authorService;

    private final AlbumService albumService;


    public Song map(SongDtoPost songDtoPost) {

        List<Author> authorList = Arrays.stream(songDtoPost.getAuthorString().split(";"))
                .map(authorName -> authorService.getAuthorByName(authorName.strip())
                        .orElse(Author.builder()
                                .name(authorName.strip())
                                .albums(new HashSet<>())
                                .build()))
                .collect(Collectors.toList());

        Set<Album> albumList = Arrays.stream(songDtoPost.getAlbumString().split(";"))
                .map(albumName -> albumService.getAlbumByName(albumName.strip())
                        .orElse(Album.builder().name(albumName.strip())
                                .build()))
                .collect(Collectors.toSet());


        albumList.forEach(album -> authorList.forEach(author -> author.getAlbums().add(album)));



        Song song = Song.builder()
                .songName(songDtoPost.getSongName())
                .playtime(songDtoPost.getPlaytime())
                .albums(albumList)
                .authors(authorList)
                .build();

        return song;
    }
}
