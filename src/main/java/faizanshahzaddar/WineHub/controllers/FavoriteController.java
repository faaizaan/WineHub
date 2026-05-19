package faizanshahzaddar.WineHub.controllers;

import faizanshahzaddar.WineHub.entities.Favorite;
import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.exceptions.ValidationException;
import faizanshahzaddar.WineHub.payloads.FavoriteDTO;
import faizanshahzaddar.WineHub.payloads.FavoriteRespDTO;
import faizanshahzaddar.WineHub.services.FavoriteService;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Page;
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

    @GetMapping("/me")
    public Page<FavoriteRespDTO> getMyFavorites(@AuthenticationPrincipal User currentAuthenticatedUser,
                                                @RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "10") int size,
                                                @RequestParam(defaultValue = "id") String sortBy) {
        return this.favoriteService.findMyFavorites(currentAuthenticatedUser, page, size, sortBy)
                .map(favorite -> new FavoriteRespDTO(
                        favorite.getId(),
                        favorite.getUser().getId(),
                        favorite.getUser().getUsername(),
                        favorite.getWine().getId(),
                        favorite.getWine().getName(),
                        favorite.getWine().getImageUrl(),
                        favorite.getWine().getPrice()
                ));
    }

    @GetMapping("/{favoriteId}")
    public FavoriteRespDTO getById(@PathVariable UUID favoriteId) {
        Favorite favorite = this.favoriteService.findById(favoriteId);

        return new FavoriteRespDTO(
                favorite.getId(),
                favorite.getUser().getId(),
                favorite.getUser().getUsername(),
                favorite.getWine().getId(),
                favorite.getWine().getName(),
                favorite.getWine().getImageUrl(),
                favorite.getWine().getPrice()
        );
    }

    @DeleteMapping("/{favoriteId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID favoriteId,@AuthenticationPrincipal User currentAuthenticatedUser) {
        this.favoriteService.findByIdAndDelete(favoriteId,currentAuthenticatedUser);
    }
}
