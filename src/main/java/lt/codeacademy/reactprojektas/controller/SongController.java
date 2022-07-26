package lt.codeacademy.reactprojektas.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.reactprojektas.dto.SongDtoGet;
import lt.codeacademy.reactprojektas.dto.SongDtoPost;
import lt.codeacademy.reactprojektas.service.PlaylistService;
import lt.codeacademy.reactprojektas.service.SongService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;
    private final PlaylistService playlistService;

    @GetMapping("/songs")
    public List<SongDtoGet> getSongList() {
        List<SongDtoGet> list = songService.getAllSongsDto();
        return list;
    }

    @PostMapping("/createsong")
    public ResponseEntity<Void> createSong(@Valid @RequestBody SongDtoPost songDtoPost){
        songService.addSong(songDtoPost);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/deletesong/{id}")
    public void deleteSong(@PathVariable Long id){
        songService.deleteSongById(id);
    }

    @PutMapping("/updatesong")
    public void updateSong(@Valid @RequestBody SongDtoPost songDtoPost){
        songService.updateSong(songDtoPost, songDtoPost.getId());
    }

//    @GetMapping("/addsong")
//    public String openAddSongForm(Model model){
//        model.addAttribute("songDtoPost", SongDtoPost.builder().build());
//        return "addSong";
//    }
//
//    @PostMapping("/addsong")
//    public String addSong(@Valid SongDtoPost songDtoPost, BindingResult errors){
//
//        System.out.println("CREATE");
//        if(errors.hasErrors()){
//            return "addSong";
//        }
//
//        songService.addSong(songDtoPost);
//        return "redirect:/addsong";
//    }
//
//    @GetMapping("/songs")
//    public String getSongList(Model model, Principal principal,
//                              @PageableDefault(size = 10, sort = {"songName"}, direction = Sort.Direction.ASC) Pageable pageable){
//
//        List<SongDtoGet> likedSongs = new ArrayList<>();
//
//        if(principal != null){
//            likedSongs = playlistService.getLikedSongs(principal.getName());
//        }
//
//        Page<SongDtoGet> page = songService.getSongsPageable(pageable);
//        model.addAttribute("songPage", page);
//        model.addAttribute("likedSongs", likedSongs);
//        return "songs";
//    }
//
//    @GetMapping("/songs/update/{id}")
//    public String getUpdatableSong(Model model, @PathVariable Long id){
//        model.addAttribute("songDtoPost", songService.getSongDtoGetByID(id));
//        return "addSong";
//    }
//
//    @PostMapping("/songs/update/{id}")
//    public String updateSong(@Valid SongDtoPost song, @PathVariable Long id, BindingResult errors){
//        System.out.println("UPDATE");
//        songService.updateSong(song, id);
//        return "redirect:/songs";
//    }
//
//    @GetMapping("/songs/delete/{id}")
//    public String deleteSong(@PathVariable Long id){
//        songService.deleteSongById(id);
//        return "redirect:/songs";

}
