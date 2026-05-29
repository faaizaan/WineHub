package faizanshahzaddar.WineHub.services;

import faizanshahzaddar.WineHub.entities.Order;
import faizanshahzaddar.WineHub.entities.OrderItem;
import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.entities.Wine;
import faizanshahzaddar.WineHub.exceptions.NotFoundException;
import faizanshahzaddar.WineHub.payloads.OrderDTO;
import faizanshahzaddar.WineHub.payloads.OrderItemDTO;
import faizanshahzaddar.WineHub.repositories.OrderRepository;
import faizanshahzaddar.WineHub.tools.EmailSender;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final WineService wineService;
    private final EmailSender emailSender;

    public OrderService(OrderRepository orderRepository, WineService wineService, EmailSender emailSender) {
        this.orderRepository = orderRepository;
        this.wineService = wineService;
        this.emailSender = emailSender;
    }

    public Order save(OrderDTO body, User currentUser) {
        Order order = new Order(currentUser);

        for (OrderItemDTO itemDTO : body.items()) {
            Wine wine = this.wineService.findById(itemDTO.wineId());

            OrderItem orderItem = new OrderItem(
                    itemDTO.quantity(),
                    wine.getPrice(),
                    order,
                    wine
            );

            order.getItems().add(orderItem);
        }

        Order savedOrder = this.orderRepository.save(order);

       try {
       emailSender.sendEmail(
                currentUser.getEmail(),
                "Ordine confermato - WineHub",
                "Ciao " + currentUser.getNome() +
                        ", il tuo ordine è stato creato correttamente. Grazie per aver scelto WineHub!"
        );
       }catch (Exception e) {
           log.warn("Email non inviata: " + e.getMessage());
       }

        return savedOrder;
    }

    public Order findById(UUID orderId) {
        return this.orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException(orderId));
    }

    public Page<Order> findAll(int page, int size, String sortBy) {
        if (size > 10 || size <= 0) size = 10;
        if (page < 0) page = 0;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return this.orderRepository.findAll(pageable);
    }

    public void findByIdAndDelete(UUID orderId) {
        Order found = this.findById(orderId);
        this.orderRepository.delete(found);
    }

    public Page<Order> findMyOrders(User currentUser, int page, int size, String sortBy) {
        if (size > 10 || size <= 0) size = 10;
        if (page < 0) page = 0;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return this.orderRepository.findByUser(currentUser, pageable);
    }
}
