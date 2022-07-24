package lt.codeacademy.reactprojektas.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.reactprojektas.dto.PlaylistRequest;
import lt.codeacademy.reactprojektas.dto.SongDtoGet;
import lt.codeacademy.reactprojektas.service.PlaylistService;
import org.springframework.security.web.header.Header;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class PlaylistController {
    private final PlaylistService playlistService;

    @PostMapping("/likesong")
    public void likeSong(@RequestBody PlaylistRequest playlistRequest) {

        System.out.println(playlistRequest.getUsername());
        Long playlistId = playlistService.getLikedSongPlaylistId(playlistRequest.getUsername());
        playlistService.addSongToPlaylist(playlistRequest.getSongId(), playlistId);
    }

    @GetMapping("/getLikedSongs/{username}")
    public List<SongDtoGet> getLikedSongs(@PathVariable String username) {
        return playlistService.getLikedSongs(username);
    }

//    @PostMapping("/LikeSong/{songId}/{page}/{sort}")
//    public String likeSong(Principal principal, @PathVariable Long songId, @PathVariable String page, @PathVariable String sort){
//        Long playlistId = playlistService.getLikedSongPlaylistId(principal.getName());
//        playlistService.addSongToPlaylist(songId, playlistId);
//        return "redirect:/songs" + "?page=" + page + "&sort=" + sort;
//    }
//
//    @PostMapping("/UnLikeSong/{songId}/{page}/{sort}")
//    public String unLikeSong(Principal principal, @PathVariable Long songId, @PathVariable String page, @PathVariable String sort){
//
//        Long playlistId = playlistService.getLikedSongPlaylistId(principal.getName());
//        playlistService.removeSongFromPlaylist(songId, playlistId);
//        return "redirect:/songs" + "?page=" + page + "&sort=" + sort;
//    }
//
//    @PostMapping("/UnLikeSong/{songId}")
//    public String unLikeSong(Principal principal, @PathVariable Long songId){
//
//        Long playlistId = playlistService.getLikedSongPlaylistId(principal.getName());
//        playlistService.removeSongFromPlaylist(songId, playlistId);
//        return "redirect:/";
//    }

}
