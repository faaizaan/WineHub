package faizanshahzaddar.WineHub.payloads;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record OrderRespDTO(

        UUID orderId,
        LocalDate orderDate,
        UUID userId,
        String username,
        List<OrderItemRespDTO> items
) {
}
