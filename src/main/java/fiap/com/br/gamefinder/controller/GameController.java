package fiap.com.br.gamefinder.controller;

import fiap.com.br.gamefinder.assembler.GameAssembler;
import fiap.com.br.gamefinder.model.Game;
import fiap.com.br.gamefinder.service.GameService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/games")
public class GameController {

    private final GameService service;
    private final GameAssembler gameAssembler;
    private final PagedResourcesAssembler<Game> pagedAssembler;

    public GameController(GameService service, GameAssembler gameAssembler,
                          PagedResourcesAssembler<Game> pagedAssembler) {
        this.service = service;
        this.gameAssembler = gameAssembler;
        this.pagedAssembler = pagedAssembler;
    }

    @GetMapping
    public PagedModel<EntityModel<Game>> findAll(
            @PageableDefault(size = 10, sort = "title", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<Game> games = service.getAll(pageable);
        return pagedAssembler.toModel(games, gameAssembler);
    }

    @GetMapping("/{id}")
    public EntityModel<Game> findById(@PathVariable Long id) {
        return gameAssembler.toModel(service.getById(id));
    }

    @GetMapping("/genres/{genreId}")
    public CollectionModel<EntityModel<Game>> findByGenre(@PathVariable Long genreId) {
        List<EntityModel<Game>> games = service.findByGenre(genreId)
                .stream().map(gameAssembler::toModel).toList();
        return CollectionModel.of(games,
                linkTo(methodOn(GameController.class).findByGenre(genreId)).withSelfRel());
    }

    @GetMapping("/platforms/{platformId}")
    public CollectionModel<EntityModel<Game>> findByPlatform(@PathVariable Long platformId) {
        List<EntityModel<Game>> games = service.findByPlatform(platformId)
                .stream().map(gameAssembler::toModel).toList();
        return CollectionModel.of(games,
                linkTo(methodOn(GameController.class).findByPlatform(platformId)).withSelfRel());
    }

    @GetMapping("/wishlist/{id}")
    public EntityModel<Game> addToWishlist(@PathVariable Long id) {
        Game game = service.getById(id);
        if (!game.isInWishlist()) {
            game = service.toggleWishlist(id);
        }
        return gameAssembler.toModel(game);
    }

    @GetMapping("/wishlist/remove/{id}")
    public EntityModel<Game> removeFromWishlist(@PathVariable Long id) {
        Game game = service.getById(id);
        if (game.isInWishlist()) {
            game = service.toggleWishlist(id);
        }
        return gameAssembler.toModel(game);
    }
}
