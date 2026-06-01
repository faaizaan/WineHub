package faizanshahzaddar.WineHub.repositories;

import faizanshahzaddar.WineHub.entities.Rewiew;
import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.entities.Wine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RewiewRepository extends JpaRepository<Rewiew, UUID> {
    List<Rewiew> findByWineId(UUID wineId);

    boolean existsByUserAndWine(User user, Wine wine);
}
