package lt.codeacademy.thymeleafprojektas.Repository;

import lt.codeacademy.thymeleafprojektas.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Long> {

}
