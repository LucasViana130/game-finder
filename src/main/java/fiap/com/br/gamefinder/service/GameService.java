package fiap.com.br.gamefinder.service;

import fiap.com.br.gamefinder.model.Game;
import fiap.com.br.gamefinder.repository.GameRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class GameService {

    private final GameRepository repository;

    public GameService(GameRepository repository) {
        this.repository = repository;
    }

    public Page<Game> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Game getById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found")
        );
    }

    public List<Game> findByGenre(Long genreId) {
        return repository.findByGenreId(genreId);
    }

    public List<Game> findByPlatform(Long platformId) {
        return repository.findByPlatformId(platformId);
    }

    public Game toggleWishlist(Long id) {
        Game game = getById(id);
        game.setInWishlist(!game.isInWishlist());
        return repository.save(game);
    }
}
