package fiap.com.br.gamefinder.repository;

import fiap.com.br.gamefinder.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {
}
