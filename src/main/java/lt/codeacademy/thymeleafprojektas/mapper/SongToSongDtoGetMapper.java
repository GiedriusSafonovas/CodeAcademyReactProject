package lt.codeacademy.thymeleafprojektas.mapper;

import lt.codeacademy.thymeleafprojektas.dto.SongDtoGet;
import lt.codeacademy.thymeleafprojektas.model.Song;
import org.springframework.stereotype.Component;

@Component
public class SongToSongDtoGetMapper {

    public SongDtoGet map(Song song){
        String albumString = song.getAlbums().stream().map(album -> album.getName() + ";").reduce("", String::concat);
        albumString = albumString.substring(0,albumString.length()-1);
        String authorString = song.getAuthors().stream().map(author -> author.getName() + ";").reduce("", String::concat);
        authorString = authorString.substring(0,authorString.length()-1);
        return SongDtoGet.builder()
                .id(song.getId())
                .songName(song.getSongName())
                .playtime(song.getPlaytime())
                .albumList(song.getAlbums())
                .authorList(song.getAuthors())
                .albumString(albumString)
                .authorString(authorString)
                .build();
    }
}
