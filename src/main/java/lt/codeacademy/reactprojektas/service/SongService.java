package lt.codeacademy.reactprojektas.service;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.reactprojektas.Repository.AlbumRepository;
import lt.codeacademy.reactprojektas.Repository.AuthorRepository;
import lt.codeacademy.reactprojektas.Repository.SongRepository;
import lt.codeacademy.reactprojektas.dto.SongDtoGet;
import lt.codeacademy.reactprojektas.dto.SongDtoPost;
import lt.codeacademy.reactprojektas.mapper.SongDtoPostToSongMapper;
import lt.codeacademy.reactprojektas.mapper.SongToSongDtoGetMapper;
import lt.codeacademy.reactprojektas.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    private final AuthorService authorService;
    private final AlbumService albumService;
    private final SongToSongDtoGetMapper songToSongDtoGetMapper;
    private final SongDtoPostToSongMapper songDtoPostToSongMapper;

    public void addSong(SongDtoPost songDtoPost) {
        System.out.println(songDtoPost);

        Song song = songDtoPostToSongMapper.map(songDtoPost);

//        song.getAlbums().stream().map(album -> albumService.getAlbumByName(album.getName()).isEmpty(albumService.addAlbum(album)));

        addNewAlbums(song);
        addNewAuthors(song);

        System.out.println("song object: " + song);


        songRepository.save(song);
    }

    private void addNewAlbums(Song song){
        song.getAlbums().forEach(album -> {
            if(albumService.getAlbumByName(album.getName()).isEmpty()){
                albumService.addAlbum(album);
            }
        });
    }

    private void addNewAuthors(Song song) {
        song.getAuthors().forEach(author -> {
            if(authorService.getAuthorByName(author.getName()).isEmpty()){
                authorService.addAuthor(author);
            }
        });
    }

    public List<SongDtoGet> getAllSongsDto() {
        return songRepository.findByOrderBySongName().stream().map(songToSongDtoGetMapper::map).collect(Collectors.toList());
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
//                .albums(songUpdate.getAlbums())
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
