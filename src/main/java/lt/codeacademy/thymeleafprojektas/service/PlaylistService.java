package lt.codeacademy.thymeleafprojektas.service;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.thymeleafprojektas.Repository.PlaylistRepository;
import lt.codeacademy.thymeleafprojektas.dto.SongDtoGet;
import lt.codeacademy.thymeleafprojektas.mapper.SongToSongDtoGetMapper;
import lt.codeacademy.thymeleafprojektas.model.Playlist;
import lt.codeacademy.thymeleafprojektas.model.Song;
import lt.codeacademy.thymeleafprojektas.model.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final SongService songService;
    private final UserService userService;
    private final SongToSongDtoGetMapper songToSongDtoGetMapper;



    @Transactional
    public void addSongToPlaylist(Long songId, Long playlistId){
        Song song = songService.getSongByID(songId);
        Playlist playlist = playlistRepository.getById(playlistId);
        playlist.getSongs().add(song);
        playlistRepository.save(playlist);
    }

    @Transactional
    public void removeSongFromPlaylist(Long songId, Long playlistId){
        Song song = songService.getSongByID(songId);
        Playlist playlist = playlistRepository.getById(playlistId);
        playlist.getSongs().remove(song);
        playlistRepository.save(playlist);
    }

    public Long getLikedSongPlaylistId(String userName){
        User user = userService.getUserByName(userName);
        Playlist playlist = user.getPlaylists().stream().filter(p -> p.getName().equals("Liked Songs")).findAny().orElseThrow();
        return playlist.getId();
    }

    public List<SongDtoGet> getLikedSongs(String userName){
        User user = userService.getUserByName(userName);
        Playlist playlist = user.getPlaylists().stream().filter(p -> p.getName().equals("Liked Songs")).findAny().orElseThrow();
        return playlist.getSongs().stream().map(songToSongDtoGetMapper::map).collect(Collectors.toList());
    }



}
