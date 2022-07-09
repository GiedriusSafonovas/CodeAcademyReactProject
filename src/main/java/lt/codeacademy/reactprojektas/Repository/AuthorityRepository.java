package lt.codeacademy.reactprojektas.Repository;

import lt.codeacademy.reactprojektas.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Long> {

}
