package faizanshahzaddar.WineHub.services;

import faizanshahzaddar.WineHub.entities.Favorite;
import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.entities.Wine;
import faizanshahzaddar.WineHub.exceptions.NotFoundException;
import faizanshahzaddar.WineHub.payloads.FavoriteDTO;
import faizanshahzaddar.WineHub.repositories.FavoriteRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final WineService wineService;

    public FavoriteService(FavoriteRepository favoriteRepository, WineService wineService) {
        this.favoriteRepository = favoriteRepository;
        this.wineService = wineService;
    }

    public Favorite save(FavoriteDTO body, User currentUser) {
        Wine wine = this.wineService.findById(body.wineId());

        Favorite favorite = new Favorite(currentUser, wine);

        return this.favoriteRepository.save(favorite);
    }

    public Favorite findById(UUID favoriteId) {
        return this.favoriteRepository.findById(favoriteId)
                .orElseThrow(() -> new NotFoundException(favoriteId));
    }

    public void findByIdAndDelete(UUID favoriteId) {
        Favorite found = this.findById(favoriteId);
        this.favoriteRepository.delete(found);
    }
}
