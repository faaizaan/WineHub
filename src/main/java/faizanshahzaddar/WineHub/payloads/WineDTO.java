package faizanshahzaddar.WineHub.payloads;


import faizanshahzaddar.WineHub.enums.WineCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record WineDTO(

        @NotBlank(message = "Nome vino obbligatorio")
        @Size(min = 2, max = 100, message = "Il nome deve essere tra 2 e 100 caratteri")
        String name,
        @NotBlank(message = "Descrizione obbligatoria")
        @Size(min = 10, message = "La descrizione deve avere almeno 10 caratteri")
        String description,
        @Positive(message = "Il prezzo deve essere maggiore di 0")
        double price,
        @NotBlank(message = "URL immagine obbligatorio")
        @Size(max = 255, message = "URL immagine troppo lungo")
        String imageUrl,
        @NotNull(message = "Categoria obbligatoria")
        WineCategory wineCategory

) {
}
