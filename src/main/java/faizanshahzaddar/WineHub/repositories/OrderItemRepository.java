package faizanshahzaddar.WineHub.repositories;

import faizanshahzaddar.WineHub.entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderItemRepository extends JpaRepository<OrderItem, UUID> {
    boolean existsByWineId(UUID wineId);
}
