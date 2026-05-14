package faizanshahzaddar.WineHub.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import faizanshahzaddar.WineHub.enums.WineCategory;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "wines")
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties({"accountNonExpired", "accountNonLocked", "authorities", "credentialsNonExpired", "enabled"})
public class Wine {

    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private WineCategory wineCategory;

    @Column(nullable = false)
    private String imageUrl;


    @ManyToOne
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    public Wine(String name, String description, double price, WineCategory wineCategory, String imageUrl, User user) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.wineCategory = wineCategory;
        this.imageUrl = imageUrl;
        this.user = user;
    }
}
