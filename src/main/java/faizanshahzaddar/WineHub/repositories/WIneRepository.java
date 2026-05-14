package faizanshahzaddar.WineHub.repositories;

import faizanshahzaddar.WineHub.entities.Wine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WIneRepository extends JpaRepository<Wine,UUID> {
}
