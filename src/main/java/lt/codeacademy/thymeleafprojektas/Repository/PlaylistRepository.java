package lt.codeacademy.thymeleafprojektas.Repository;

import lt.codeacademy.thymeleafprojektas.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

}
