package faizanshahzaddar.WineHub.services;

import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.exceptions.NotFoundException;
import faizanshahzaddar.WineHub.exceptions.UnauthorizedException;
import faizanshahzaddar.WineHub.payloads.LoginDTO;
import faizanshahzaddar.WineHub.securities.TokenTools;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final TokenTools tokenTools;
    private final PasswordEncoder bcrypt;

    public AuthService(UserService userService, TokenTools tokenTools, PasswordEncoder bcrypt) {

        this.userService = userService;
        this.tokenTools = tokenTools;
        this.bcrypt = bcrypt;
    }

    public String checkCredentialsAndGenerateToken(LoginDTO body) {
        try {
            User found = this.userService.findByEmail(body.email());
            if (this.bcrypt.matches(body.password(), found.getPassword())) {
                return this.tokenTools.generateToken(found);
            } else {
                throw new UnauthorizedException("Credenziali errate");
            }
        } catch (NotFoundException ex) {
            throw new UnauthorizedException("Credenziali errate");
        }
    }
}
