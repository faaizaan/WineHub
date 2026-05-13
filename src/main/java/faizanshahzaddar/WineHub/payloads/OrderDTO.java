package faizanshahzaddar.WineHub.payloads;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record OrderDTO(

        @NotEmpty(message = "L'ordine deve contenere almeno un vino")
        @Valid
        List<OrderItemDTO> items
) {
}
