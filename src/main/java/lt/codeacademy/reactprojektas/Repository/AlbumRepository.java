package lt.codeacademy.reactprojektas.Repository;

import lt.codeacademy.reactprojektas.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {

    Optional<Album> findAlbumByName(String albumName);

}
