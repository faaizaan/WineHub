package faizanshahzaddar.WineHub.payloads;

import java.util.UUID;

public record OrderItemRespDTO(

        UUID orderItemId,
        int quantity,
        double priceAtPurchase,
        UUID wineId,
        String wineName,
        String wineImageUrl
) {
}
