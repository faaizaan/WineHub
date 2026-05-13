package faizanshahzaddar.WineHub.payloads;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record OrderItemDTO(

        @NotNull(message = "Id vino obbligatorio")
        UUID wineId,
        @Min(value = 1, message = "La quantità deve essere almeno 1")
        @Max(value = 99, message = "La quantità massima è 99")
        int quantity


) {
}
