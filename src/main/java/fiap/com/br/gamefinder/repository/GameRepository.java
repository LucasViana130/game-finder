package fiap.com.br.gamefinder.repository;

import fiap.com.br.gamefinder.model.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {

    List<Game> findByGenreId(Long genreId);

    List<Game> findByPlatformId(Long platformId);

    Page<Game> findAll(Pageable pageable);
}
