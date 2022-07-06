package lt.codeacademy.thymeleafprojektas.Repository;


import lt.codeacademy.thymeleafprojektas.model.Song;
import org.postgresql.core.NativeQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

    Page<Song> findSongBySongNameIsLikeIgnoreCase(String songName, Pageable pageable);

    @Query(value = "DELETE FROM song_albums WHERE songs_id = ?1",nativeQuery = true)
    @Modifying
    void deleteByIdSongAlbum(Long id);

    @Query(value = "DELETE FROM song_authors WHERE song_id = ?1",nativeQuery = true)
    @Modifying
    void deleteByIdSongAuthor(Long id);

    @Query(value = "DELETE FROM playlist_songs WHERE songs_id = ?1",nativeQuery = true)
    @Modifying
    void deleteByIdSongPlaylist(Long id);

    @Query(value = "DELETE FROM song WHERE id = ?1",nativeQuery = true)
    @Modifying
    void deleteByIdSong(Long id);

}
