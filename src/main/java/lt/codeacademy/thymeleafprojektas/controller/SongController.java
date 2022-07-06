package lt.codeacademy.thymeleafprojektas.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.thymeleafprojektas.dto.SongDtoGet;
import lt.codeacademy.thymeleafprojektas.dto.SongDtoPost;
import lt.codeacademy.thymeleafprojektas.service.PlaylistService;
import lt.codeacademy.thymeleafprojektas.service.SongService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;
    private final PlaylistService playlistService;

    @GetMapping("/addsong")
    public String openAddSongForm(Model model){
        model.addAttribute("songDtoPost", SongDtoPost.builder().build());
        return "addSong";
    }

    @PostMapping("/addsong")
    public String addSong(@Valid SongDtoPost songDtoPost, BindingResult errors){

        System.out.println("CREATE");
        if(errors.hasErrors()){
            return "addSong";
        }

        songService.addSong(songDtoPost);
        return "redirect:/addsong";
    }

    @GetMapping("/songs")
    public String getSongList(Model model, Principal principal,
                              @PageableDefault(size = 10, sort = {"songName"}, direction = Sort.Direction.ASC) Pageable pageable){

        List<SongDtoGet> likedSongs = new ArrayList<>();

        if(principal != null){
            likedSongs = playlistService.getLikedSongs(principal.getName());
        }

        Page<SongDtoGet> page = songService.getSongsPageable(pageable);
        model.addAttribute("songPage", page);
        model.addAttribute("likedSongs", likedSongs);
        return "songs";
    }

    @GetMapping("/songs/update/{id}")
    public String getUpdatableSong(Model model, @PathVariable Long id){
        model.addAttribute("songDtoPost", songService.getSongDtoGetByID(id));
        return "addSong";
    }

    @PostMapping("/songs/update/{id}")
    public String updateSong(@Valid SongDtoPost song, @PathVariable Long id, BindingResult errors){
        System.out.println("UPDATE");
        songService.updateSong(song, id);
        return "redirect:/songs";
    }

    @GetMapping("/songs/delete/{id}")
    public String deleteSong(@PathVariable Long id){
        songService.deleteSongById(id);
        return "redirect:/songs";
    }
}
