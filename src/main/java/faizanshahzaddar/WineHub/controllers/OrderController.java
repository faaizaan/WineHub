package faizanshahzaddar.WineHub.controllers;

import faizanshahzaddar.WineHub.entities.Order;
import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.exceptions.ValidationException;
import faizanshahzaddar.WineHub.payloads.OrderDTO;
import faizanshahzaddar.WineHub.payloads.OrderItemRespDTO;
import faizanshahzaddar.WineHub.payloads.OrderRespDTO;
import faizanshahzaddar.WineHub.services.OrderService;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderRespDTO save(@RequestBody @Validated OrderDTO body,
                             BindingResult validationResult,
                             @AuthenticationPrincipal User currentAuthenticatedUser) {

        if (validationResult.hasErrors()) {
            List<String> errors = validationResult.getFieldErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList();
            throw new ValidationException(errors);
        }

        Order newOrder = this.orderService.save(body, currentAuthenticatedUser);

        List<OrderItemRespDTO> items = newOrder.getItems()
                .stream()
                .map(item -> new OrderItemRespDTO(
                        item.getId(),
                        item.getQuantity(),
                        item.getPriceAtPurchase(),
                        item.getWine().getId(),
                        item.getWine().getName()
                ))
                .toList();

        return new OrderRespDTO(
                newOrder.getId(),
                newOrder.getOrderDate(),
                newOrder.getUser().getId(),
                newOrder.getUser().getUsername(),
                items
        );
    }

    @GetMapping
    public Page<Order> getOrders(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size,
                                 @RequestParam(defaultValue = "orderDate") String sortBy) {
        return this.orderService.findAll(page, size, sortBy);
    }

    @GetMapping("/{orderId}")
    public Order getById(@PathVariable UUID orderId) {
        return this.orderService.findById(orderId);
    }

    @DeleteMapping("/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID orderId) {
        this.orderService.findByIdAndDelete(orderId);
    }

    @GetMapping("/me")
    public Page<Order> getMyOrders(@AuthenticationPrincipal User currentAuthenticatedUser,
                                   @RequestParam(defaultValue = "0") int page,
                                   @RequestParam(defaultValue = "10") int size,
                                   @RequestParam(defaultValue = "orderDate") String sortBy) {
        return this.orderService.findMyOrders(currentAuthenticatedUser, page, size, sortBy);
    }
}
