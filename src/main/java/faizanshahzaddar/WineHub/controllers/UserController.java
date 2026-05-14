package faizanshahzaddar.WineHub.controllers;


import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.payloads.UserDTO;
import faizanshahzaddar.WineHub.services.UserService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping
    public Page<User> getUser(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "10") int size,
                                  @RequestParam(defaultValue = "email") String sortBy) {
        return this.userService.findAll(page, size, sortBy);
    }

    @GetMapping("/me")
    public User getOwnProfile(@AuthenticationPrincipal User currentAuthenticatedUser) {
        return currentAuthenticatedUser;
    }

    @PutMapping("/me")
    public User updateOwnProfile(@AuthenticationPrincipal User currentAuthenticatedUser, @RequestBody UserDTO body) {
        return this.userService.findByIdAndUpdate(currentAuthenticatedUser.getId(), body);
    }

    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOwnProfile(@AuthenticationPrincipal User currentAuthenticatedUser) {
        this.userService.findByIdAndDelete(currentAuthenticatedUser.getId());
    }

    @GetMapping("/{userId}")
    public User getById(@PathVariable UUID userId) {
        return this.userService.findById(userId);
    }

    @PutMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public User getByIdAndUpdate(@PathVariable UUID userId, @RequestBody @Validated UserDTO body) {
        return this.userService.findByIdAndUpdate(userId, body);
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void getByIdAndDelete(@PathVariable UUID userId) {
        this.userService.findByIdAndDelete(userId);
    }

    @PatchMapping("/me/become-seller")
    public User becomeSeller(@AuthenticationPrincipal User currentAuthenticatedUser) {
        return this.userService.becomeSeller(currentAuthenticatedUser.getId());
    }
}
