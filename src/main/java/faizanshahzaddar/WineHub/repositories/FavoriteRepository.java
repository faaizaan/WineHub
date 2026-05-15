package faizanshahzaddar.WineHub.repositories;

import faizanshahzaddar.WineHub.entities.Favorite;
import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.entities.Wine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface FavoriteRepository extends JpaRepository<Favorite, UUID> {
    Page<Favorite> findByUser(User user, Pageable pageable);

    boolean existsByUserAndWine(User user, Wine wine);

    Optional<Favorite> findByUserAndWine(User user, Wine wine);
}
