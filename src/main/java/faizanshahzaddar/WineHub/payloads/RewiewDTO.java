package faizanshahzaddar.WineHub.payloads;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record RewiewDTO(
        @Min(1)
        @Max(5)
        int rating,
        String comment
) {
}
