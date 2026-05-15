package faizanshahzaddar.WineHub.payloads;

import java.util.UUID;

public record FavoriteRespDTO(
        UUID favoriteId,
        UUID userId,
        String username,
        UUID wineId,
        String wineName,
        String imageUrl,
        double price
) {
}
