package faizanshahzaddar.WineHub.payloads;

import faizanshahzaddar.WineHub.enums.WineCategory;

import java.util.UUID;

public record WineRespDTO(
        UUID id,
        String name,
        String description,
        double price,
        WineCategory wineCategory,
        String imageUrl,
        UUID sellerId,
        String sellerUsername
) {
}
