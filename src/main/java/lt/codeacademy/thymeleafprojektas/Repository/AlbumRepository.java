package lt.codeacademy.thymeleafprojektas.Repository;

import lt.codeacademy.thymeleafprojektas.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {

    Optional<Album> findAlbumByName(String albumName);

}
