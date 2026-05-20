package faizanshahzaddar.WineHub.repositories;

import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.entities.Wine;
import faizanshahzaddar.WineHub.enums.WineCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WineRepository extends JpaRepository<Wine,UUID> {
    boolean existsByNameAndUser(String name, User user);
    Page<Wine> findByUser(User user, Pageable pageable);
    Page<Wine> findByWineCategory(WineCategory wineCategory, Pageable pageable);
}
