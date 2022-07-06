package lt.codeacademy.thymeleafprojektas.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.thymeleafprojektas.dto.SongDtoGet;
import lt.codeacademy.thymeleafprojektas.model.Song;
import lt.codeacademy.thymeleafprojektas.service.PlaylistService;
import lt.codeacademy.thymeleafprojektas.service.SearchService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;
    private final PlaylistService playlistService;

    @GetMapping("/search")
    public String search(@RequestParam String songName){
        if(songName.equals("")){
            return "redirect:/songs";
        }
        return "forward:/search/result/" + songName;
    }

    @GetMapping("/search/result/{songName}")
    public String searchResult(Model model, Principal principal, @PathVariable String songName, @PageableDefault(size = 10, sort = {"songName"}, direction = Sort.Direction.ASC) Pageable pageable){

        List<SongDtoGet> likedSongs = new ArrayList<>();

        if(principal != null){
            likedSongs = playlistService.getLikedSongs(principal.getName());
        }

        Page<SongDtoGet> songPage = searchService.searchSongByname(songName, pageable);
        model.addAttribute("songPage", songPage);
        model.addAttribute("likedSongs", likedSongs);
        return "songs";
    }


}
