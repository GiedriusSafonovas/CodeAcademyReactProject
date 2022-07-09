package lt.codeacademy.reactprojektas.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.reactprojektas.dto.SongDtoGet;
import lt.codeacademy.reactprojektas.service.PlaylistService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class HomePageController {
    private final PlaylistService playlistService;

    @GetMapping("/")
    public String getHomePage(Model model, Principal principal){

        List<SongDtoGet> songs = null;
        if(principal != null){
            songs = playlistService.getLikedSongs(principal.getName());
        }
        model.addAttribute("songList", songs);

        return "homePage";
    }
}
