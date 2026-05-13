package faizanshahzaddar.WineHub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface Wine extends JpaRepository<Wine, UUID> {
}
