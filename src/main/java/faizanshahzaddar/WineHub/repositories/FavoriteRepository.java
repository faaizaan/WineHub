package faizanshahzaddar.WineHub.repositories;

import faizanshahzaddar.WineHub.entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FavoriteRepository extends JpaRepository<Favorite, UUID> {
}
