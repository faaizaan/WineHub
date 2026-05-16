package faizanshahzaddar.WineHub.services;

import faizanshahzaddar.WineHub.entities.Favorite;
import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.entities.Wine;
import faizanshahzaddar.WineHub.exceptions.AccessDeniedException;
import faizanshahzaddar.WineHub.exceptions.BadRequestException;
import faizanshahzaddar.WineHub.exceptions.NotFoundException;
import faizanshahzaddar.WineHub.payloads.FavoriteDTO;
import faizanshahzaddar.WineHub.repositories.FavoriteRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

        if (this.favoriteRepository.existsByUserAndWine(currentUser, wine)) {
            throw new BadRequestException("Questo vino è già nei preferiti");
        }

        Favorite favorite = new Favorite(currentUser, wine);
        return this.favoriteRepository.save(favorite);
    }

    public Page<Favorite> findMyFavorites(User currentUser, int page, int size, String sortBy) {
        if (size > 10 || size <= 0) size = 10;
        if (page < 0) page = 0;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return this.favoriteRepository.findByUser(currentUser, pageable);
    }

    public Favorite findById(UUID favoriteId) {
        return this.favoriteRepository.findById(favoriteId)
                .orElseThrow(() -> new NotFoundException(favoriteId));
    }

    public void findByIdAndDelete(UUID favoriteId, User currentUser) {
        Favorite found = this.findById(favoriteId);

        if (!found.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Non puoi eliminare un preferito di un altro utente");
        }

        this.favoriteRepository.delete(found);
    }

    public void deleteByWine(UUID wineId, User currentUser) {
        Wine wine = this.wineService.findById(wineId);

        Favorite favorite = this.favoriteRepository.findByUserAndWine(currentUser, wine)
                .orElseThrow(() -> new NotFoundException("Preferito non trovato"));

        this.favoriteRepository.delete(favorite);
    }
}
