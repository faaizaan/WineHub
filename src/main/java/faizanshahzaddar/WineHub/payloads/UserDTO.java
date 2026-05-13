package faizanshahzaddar.WineHub.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserDTO(

        @NotBlank(message = "Username obbligatorio")
        @Size(min = 3, max = 30, message = "Username tra 3 e 30 caratteri")
        String username,
        @NotBlank(message = "Email obbligatoria")
        @Email(message = "Email non valida")
        String email,
        @NotBlank(message = "Password obbligatoria")
        @Size(min = 8, message = "Minimo 8 caratteri")
        String password,
        @NotBlank(message = "Nome obbligatorio")
        @Size(min = 2, max = 50, message = "Nome tra 2 e 50 caratteri")
        String nome,
        @NotBlank(message = "Cognome obbligatorio")
        @Size(min = 2, max = 50, message = "Cognome tra 2 e 50 caratteri")
        String cognome,
        @Size(max = 255, message = "URL avatar troppo lungo")
        @Pattern(
                regexp = "^(http|https)://.*$",
                message = "L'avatar deve essere un URL valido"
        )
        String avatar
) {
}
