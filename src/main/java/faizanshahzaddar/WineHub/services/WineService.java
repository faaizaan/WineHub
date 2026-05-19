package faizanshahzaddar.WineHub.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.entities.Wine;
import faizanshahzaddar.WineHub.enums.Role;
import faizanshahzaddar.WineHub.exceptions.AccessDeniedException;
import faizanshahzaddar.WineHub.exceptions.BadRequestException;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@Slf4j
public class WineService {
    private final WineRepository wineRepository;
    private final Cloudinary cloudinaryUploader;

    public WineService(WineRepository wineRepository, Cloudinary cloudinaryUploader) {
        this.wineRepository = wineRepository;
        this.cloudinaryUploader = cloudinaryUploader;
    }

    public Wine save(WineDTO body, User currentUser){

        if (wineRepository.existsByNameAndUser(body.name().trim(), currentUser)) {
            throw new BadRequestException("Hai già inserito un vino con questo nome");
        }

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
            throw new AccessDeniedException("Non puoi eliminare un vino del quale non sei proprietario");
        }

        this.wineRepository.delete(found);
    }

    public Wine findByIdAndUpdate(UUID wineId, WineDTO body, User currentUser){
        Wine found = this.findById(wineId);

        boolean isAdmin = currentUser.getRole() == Role.ADMIN;
        boolean isOwner = found.getUser().getId().equals(currentUser.getId());

        if (!isAdmin && !isOwner) {
            throw new AccessDeniedException("Non puoi modificare un vino del quale non sei proprietario");
        }

        if (!found.getName().equalsIgnoreCase(body.name().trim())){
            if (wineRepository.existsByNameAndUser(body.name().trim(), currentUser)) {
                throw new BadRequestException("Hai già inserito un vino con questo nome");
            }
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

    public Wine imageUpload(MultipartFile file, UUID wineId, User currentUser) {

        Wine found = this.findById(wineId);

        boolean isAdmin = currentUser.getRole() == Role.ADMIN;
        boolean isOwner = found.getUser().getId().equals(currentUser.getId());

        if (!isAdmin && !isOwner) {
            throw new AccessDeniedException("Non puoi modificare un vino del quale non sei proprietario");
        }

        try {
            Map result = cloudinaryUploader.uploader()
                    .upload(file.getBytes(), ObjectUtils.emptyMap());

            String url = (String) result.get("secure_url");

            found.setImageUrl(url);

            return this.wineRepository.save(found);

        } catch (IOException e) {
            throw new RuntimeException("Errore upload immagine", e);
        }
    }

    public Page<Wine> findMyWines(User currentUser, int page, int size, String sortBy){
        if (size > 10 || size <= 0) size = 10;
        if (page < 0) page = 0;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return this.wineRepository.findByUser(currentUser, pageable);
    }
}
