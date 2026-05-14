package faizanshahzaddar.WineHub.services;

import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.entities.Wine;
import faizanshahzaddar.WineHub.enums.Role;
import faizanshahzaddar.WineHub.exceptions.NotFoundException;
import faizanshahzaddar.WineHub.exceptions.UnauthorizedException;
import faizanshahzaddar.WineHub.payloads.WineDTO;
import faizanshahzaddar.WineHub.repositories.WineRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class WineService {
    private final WineRepository wineRepository;

    public WineService(WineRepository wineRepository) {
        this.wineRepository = wineRepository;
    }

    public Wine save(WineDTO body, User currentUser){

        if (currentUser.getRole() != Role.SELLER && currentUser.getRole() != Role.ADMIN)
            throw new UnauthorizedException("Diventa un rivenditore per vendere i tuoi vini");

        Wine wine = new Wine(body.name().trim(), body.description().trim(),body.price(),body.wineCategory(),body.imageUrl().trim(),currentUser);

        return wineRepository.save(wine);
    }

    public Wine findById(UUID wineId){
        return this.wineRepository.findById(wineId).orElseThrow(()-> new NotFoundException(wineId));
    }

    public Page<Wine> findAll(int page, int size, String sortBy) {
        if (size > 10 || size < 0) size = 10;
        if (page < 0) page = 0;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return this.wineRepository.findAll(pageable);
    }

    public void findByIdAndDelete(UUID wineId, User currentUser) {
        Wine found = this.findById(wineId);

        boolean isAdmin = currentUser.getRole() == Role.ADMIN;
        boolean isOwner = found.getUser().getId().equals(currentUser.getId());

        if (!isAdmin && !isOwner) {
            throw new UnauthorizedException("Non puoi eliminare un vino del quale non sei proprietario");
        }

        this.wineRepository.delete(found);
    }

    public Wine findByIdAndUpdate(UUID wineId, WineDTO body, User currentUser){
        Wine found = this.findById(wineId);

        boolean isAdmin = currentUser.getRole() == Role.ADMIN;
        boolean isOwner = found.getUser().getId().equals(currentUser.getId());

        if (!isAdmin && !isOwner) {
            throw new UnauthorizedException("Non puoi modificare un vino del quale non sei proprietario");
        }

        found.setName(body.name().trim());
        found.setDescription(body.description().trim());
        found.setPrice(body.price());
        found.setWineCategory(body.wineCategory());

        if (body.imageUrl() != null && !body.imageUrl().isBlank()) {
            found.setImageUrl(body.imageUrl().trim());
        }

        Wine updateWine = this.wineRepository.save(found);
        log.info("Il vino " + updateWine.getId() + " è stato aggiornato correttamente");

        return updateWine;
    }
}
