package faizanshahzaddar.WineHub.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "order_items")
@NoArgsConstructor
@Getter
@Setter
public class OrderItem {

    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private double priceAtPurchase;

    @ManyToOne
    @JoinColumn(nullable = false, name = "order_id")
    @JsonIgnore
    private Order order;

    @ManyToOne
    @JoinColumn(nullable = false, name = "wine_id")
    private Wine wine;

    public OrderItem(int quantity, double priceAtPurchase, Order order, Wine wine) {
        this.quantity = quantity;
        this.priceAtPurchase = priceAtPurchase;
        this.order = order;
        this.wine = wine;
    }
}
