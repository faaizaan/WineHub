package faizanshahzaddar.WineHub.payloads;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record FavoriteDTO(
        @NotNull(message = "Id vino obbligatorio")
        UUID wineId
) {
}
