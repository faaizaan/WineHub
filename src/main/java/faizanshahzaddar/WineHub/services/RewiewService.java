package faizanshahzaddar.WineHub.services;

import faizanshahzaddar.WineHub.entities.Rewiew;
import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.entities.Wine;
import faizanshahzaddar.WineHub.exceptions.BadRequestException;
import faizanshahzaddar.WineHub.exceptions.NotFoundException;
import faizanshahzaddar.WineHub.payloads.RewiewDTO;
import faizanshahzaddar.WineHub.payloads.RewiewRespDTO;
import faizanshahzaddar.WineHub.repositories.RewiewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class RewiewService {
    private final RewiewRepository rewiewRepository;
    private final WineService wineService;

    public RewiewService(RewiewRepository rewiewRepository, WineService wineService) {
        this.rewiewRepository = rewiewRepository;
        this.wineService = wineService;
    }

    public RewiewRespDTO save(UUID wineId, RewiewDTO body, User currentUser) {
        Wine wine = this.wineService.findById(wineId);

        if (this.rewiewRepository.existsByUserAndWine(currentUser, wine)) {
            throw new BadRequestException("Hai già recensito questo vino");
        }

        Rewiew review = new Rewiew();
        review.setRating(body.rating());
        review.setComment(body.comment());
        review.setUser(currentUser);
        review.setWine(wine);
        review.setCreatedAt(LocalDateTime.now());

        Rewiew savedReview = this.rewiewRepository.save(review);

        return new RewiewRespDTO(
                savedReview.getId(),
                savedReview.getUser().getId(),
                savedReview.getUser().getUsername(),
                savedReview.getWine().getId(),
                savedReview.getWine().getName(),
                savedReview.getRating(),
                savedReview.getComment(),
                savedReview.getCreatedAt()
        );
    }

    public List<RewiewRespDTO> findByWine(UUID wineId) {
        return this.rewiewRepository.findByWineId(wineId)
                .stream()
                .map(review -> new RewiewRespDTO(
                        review.getId(),
                        review.getUser().getId(),
                        review.getUser().getUsername(),
                        review.getWine().getId(),
                        review.getWine().getName(),
                        review.getRating(),
                        review.getComment(),
                        review.getCreatedAt()
                ))
                .toList();
    }

    public void findByIdAndDelete(UUID reviewId, User currentUser) {
        Rewiew found = this.rewiewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException(reviewId));

        if (!found.getUser().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Non puoi eliminare questa recensione");
        }

        this.rewiewRepository.delete(found);
    }
}