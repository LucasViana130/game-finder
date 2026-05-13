package fiap.com.br.gamefinder.assembler;

import fiap.com.br.gamefinder.controller.GameController;
import fiap.com.br.gamefinder.model.Game;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class GameAssembler implements RepresentationModelAssembler<Game, EntityModel<Game>> {

    @Override
    public EntityModel<Game> toModel(Game game) {
        EntityModel<Game> model = EntityModel.of(
                game,
                linkTo(methodOn(GameController.class).findById(game.getId()))
                        .withSelfRel()
                        .withTitle(game.getTitle()),
                linkTo(methodOn(GameController.class).findByGenre(game.getGenre().getId()))
                        .withRel("same-genre")
                        .withTitle("Games in " + game.getGenre().getName() + " genre"),
                linkTo(methodOn(GameController.class).findByPlatform(game.getPlatform().getId()))
                        .withRel("same-platform")
                        .withTitle("Games on " + game.getPlatform().getName())
        );

        if (game.isInWishlist()) {
            model.add(
                    linkTo(methodOn(GameController.class).removeFromWishlist(game.getId()))
                            .withRel("remove-from-wishlist")
                            .withTitle("Remove " + game.getTitle() + " from wishlist")
            );
        } else {
            model.add(
                    linkTo(methodOn(GameController.class).addToWishlist(game.getId()))
                            .withRel("add-to-wishlist")
                            .withTitle("Add " + game.getTitle() + " to wishlist")
            );
        }

        return model;
    }
}
