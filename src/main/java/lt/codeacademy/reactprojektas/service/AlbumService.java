package lt.codeacademy.reactprojektas.service;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.reactprojektas.Repository.AlbumRepository;
import lt.codeacademy.reactprojektas.model.Album;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;

    public Optional<Album> getAlbumByName(String albumName){
        return albumRepository.findAlbumByName(albumName);
    }

    public void addAlbum(Album album){
        albumRepository.save(album);
    }

}
