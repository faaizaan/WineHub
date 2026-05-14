package faizanshahzaddar.WineHub.repositories;

import faizanshahzaddar.WineHub.entities.Wine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WineRepository extends JpaRepository<Wine,UUID> {
}
