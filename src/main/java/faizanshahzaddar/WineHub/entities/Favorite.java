package faizanshahzaddar.WineHub.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "favorites")
@NoArgsConstructor
@Getter
@Setter
public class Favorite {

    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;

    @ManyToOne
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(nullable = false, name = "wine_id")
    private Wine wine;

    public Favorite(User user, Wine wine) {
        this.user = user;
        this.wine = wine;
    }
}
