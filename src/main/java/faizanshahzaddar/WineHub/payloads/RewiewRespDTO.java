package faizanshahzaddar.WineHub.payloads;

import java.time.LocalDateTime;
import java.util.UUID;

public record RewiewRespDTO(

        UUID reviewId,
        UUID userId,
        String username,
        UUID wineId,
        String wineName,
        int rating,
        String comment,
        LocalDateTime createdAt
) {
}
