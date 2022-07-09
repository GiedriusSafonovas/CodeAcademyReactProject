package lt.codeacademy.reactprojektas.service;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.reactprojektas.Repository.SongRepository;
import lt.codeacademy.reactprojektas.dto.SongDtoGet;
import lt.codeacademy.reactprojektas.mapper.SongToSongDtoGetMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final SongRepository songRepository;
    private final SongToSongDtoGetMapper songToSongDtoGetMapper;

    public Page<SongDtoGet> searchSongByname(String songName, Pageable pageable){
        return songRepository.findSongBySongNameIsLikeIgnoreCase(songName, pageable).map(songToSongDtoGetMapper::map);
    }
}
