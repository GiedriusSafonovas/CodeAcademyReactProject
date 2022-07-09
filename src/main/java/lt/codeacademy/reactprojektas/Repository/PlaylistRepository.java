package lt.codeacademy.reactprojektas.Repository;

import lt.codeacademy.reactprojektas.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

}
