package faizanshahzaddar.WineHub.controllers;

import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.exceptions.ValidationException;
import faizanshahzaddar.WineHub.payloads.LoginDTO;
import faizanshahzaddar.WineHub.payloads.LoginRespDTO;
import faizanshahzaddar.WineHub.payloads.UserDTO;
import faizanshahzaddar.WineHub.payloads.UserRespDTO;
import faizanshahzaddar.WineHub.services.AuthService;
import faizanshahzaddar.WineHub.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {

        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public LoginRespDTO login(@RequestBody @Validated LoginDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            List<String> errors = validationResult.getFieldErrors()
                    .stream()
                    .map(error -> error.getDefaultMessage())
                    .toList();
            throw new ValidationException(errors);
        }
        return new LoginRespDTO(this.authService.checkCredentialsAndGenerateToken(body));
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED) // 201
    public UserRespDTO saveUser(@RequestBody @Validated UserDTO body, BindingResult validationResult) {

        if (validationResult.hasErrors()) {
            List<String> errors = validationResult.getFieldErrors().stream().map(error -> error.getDefaultMessage()).toList();
            throw new ValidationException(errors);
        }

        User newUser = this.userService.save(body);
        return new UserRespDTO(newUser.getId());
    }
}
