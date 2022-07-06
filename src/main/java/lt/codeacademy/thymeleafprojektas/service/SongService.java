package lt.codeacademy.thymeleafprojektas.service;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.thymeleafprojektas.Repository.AlbumRepository;
import lt.codeacademy.thymeleafprojektas.Repository.AuthorRepository;
import lt.codeacademy.thymeleafprojektas.Repository.SongRepository;
import lt.codeacademy.thymeleafprojektas.dto.SongDtoGet;
import lt.codeacademy.thymeleafprojektas.dto.SongDtoPost;
import lt.codeacademy.thymeleafprojektas.mapper.SongDtoPostToSongMapper;
import lt.codeacademy.thymeleafprojektas.mapper.SongToSongDtoGetMapper;
import lt.codeacademy.thymeleafprojektas.model.Album;
import lt.codeacademy.thymeleafprojektas.model.Author;
import lt.codeacademy.thymeleafprojektas.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    private final AuthorRepository authorRepository;
    private final AlbumRepository albumRepository;
    private final SongToSongDtoGetMapper songToSongDtoGetMapper;
    private final SongDtoPostToSongMapper songDtoPostToSongMapper;

    public void addSong(SongDtoPost songDtoPost) {
        System.out.println(songDtoPost);

        Song song = songDtoPostToSongMapper.map(songDtoPost);

        System.out.println(song);

        songRepository.save(song);
    }

    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    public Page<SongDtoGet> getSongsPageable(Pageable pageable) {
        return songRepository.findAll(pageable).map(songToSongDtoGetMapper::map);
    }

    public SongDtoGet getSongDtoGetByID(Long id) {
        Song song = songRepository.findById(id).orElseThrow();
        return songToSongDtoGetMapper.map(song);
    }

    public Song getSongByID(Long id) {
        return songRepository.findById(id).orElseThrow();
    }

    @Transactional
    public void updateSong(SongDtoPost songDtoPost, Long id) {
        songDtoPost.setId(id);
        Song songUpdate = songDtoPostToSongMapper.map(songDtoPost);

        Song song = songRepository.getById(id);

        song = song.toBuilder()
                .songName(songUpdate.getSongName())
                .playtime(songUpdate.getPlaytime())
                .albums(songUpdate.getAlbums())
                .authors(songUpdate.getAuthors()).build();

        songRepository.save(song);
    }

    @Transactional
    public void deleteSongById(Long id) {
        songRepository.deleteById(id);
//        songRepository.deleteByIdSongAlbum(id);
//        songRepository.deleteByIdSongAuthor(id);
//        songRepository.deleteByIdSongPlaylist(id);
//        songRepository.deleteByIdSong(id);
    }
}
