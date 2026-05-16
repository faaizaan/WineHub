package faizanshahzaddar.WineHub.controllers;

import faizanshahzaddar.WineHub.entities.Favorite;
import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.exceptions.ValidationException;
import faizanshahzaddar.WineHub.payloads.FavoriteDTO;
import faizanshahzaddar.WineHub.payloads.FavoriteRespDTO;
import faizanshahzaddar.WineHub.services.FavoriteService;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FavoriteRespDTO save(@RequestBody @Validated FavoriteDTO body,
                                BindingResult validationResult,
                                @AuthenticationPrincipal User currentAuthenticatedUser) {

        if (validationResult.hasErrors()) {
            List<String> errors = validationResult.getFieldErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList();
            throw new ValidationException(errors);
        }

        Favorite newFavorite = this.favoriteService.save(body, currentAuthenticatedUser);

        return new FavoriteRespDTO(
                newFavorite.getId(),
                newFavorite.getUser().getId(),
                newFavorite.getUser().getUsername(),
                newFavorite.getWine().getId(),
                newFavorite.getWine().getName(),
                newFavorite.getWine().getImageUrl(),
                newFavorite.getWine().getPrice()
        );
    }

    @GetMapping("/{favoriteId}")
    public Favorite getById(@PathVariable UUID favoriteId) {
        return this.favoriteService.findById(favoriteId);
    }

    @DeleteMapping("/{favoriteId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID favoriteId,@AuthenticationPrincipal User currentAuthenticatedUser) {
        this.favoriteService.findByIdAndDelete(favoriteId,currentAuthenticatedUser);
    }
}
