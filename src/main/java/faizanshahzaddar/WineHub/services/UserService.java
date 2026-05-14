package faizanshahzaddar.WineHub.services;


import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.enums.Role;
import faizanshahzaddar.WineHub.exceptions.BadRequestException;
import faizanshahzaddar.WineHub.exceptions.NotFoundException;
import faizanshahzaddar.WineHub.payloads.UserDTO;
import faizanshahzaddar.WineHub.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder bcrypt;


    public UserService(UserRepository userRepository, PasswordEncoder bcrypt) {
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
    }

    public User save(UserDTO body){
        String email = body.email().toLowerCase().trim();
        String username = body.username().toLowerCase().trim();

        if (userRepository.existsByEmail(email))throw new BadRequestException("Email già in uso");
        if (userRepository.existsByUsername(username))throw new BadRequestException("Username già in uso");

        User user = new User(username, email, body.nome(),bcrypt.encode(body.password()), body.cognome());

        return userRepository.save(user);
    }

    public User findById(UUID userId) {
        return this.userRepository.findById(userId).orElseThrow(() -> new NotFoundException(userId));
    }

    public User findByEmail(String email) {
        return this.userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Email non trovato"));
    }

    public User findByIdAndUpdate(UUID utenteId, UserDTO body){
        User found = this.findById(utenteId);

        String newUsername = body.username().toLowerCase().trim();
        String newEmail = body.email().toLowerCase().trim();

        if (!found.getUsername().equals(newUsername)){
            if (this.userRepository.existsByUsername(newUsername))
                throw new BadRequestException("L'username " + newUsername + " è gia in uso ");
        }
        if (!found.getEmail().equals(newEmail)){
            if (this.userRepository.existsByEmail(newEmail))
                throw new BadRequestException("L'email " + newEmail + "è gia in uso");
        }
        found.setUsername(newUsername);
        found.setEmail(newEmail);
        found.setNome(body.nome());
        found.setCognome(body.cognome());

        if (body.password() != null && !body.password().isBlank()) {
            String nuovaPassword = this.bcrypt.encode(body.password());
            found.setPassword(nuovaPassword);
        }

        if (body.avatar() != null && !body.avatar().isBlank()) {
            found.setAvatar(body.avatar());
        }

        User updateUser = this.userRepository.save(found);
        log.info("L'utente " + updateUser.getId() + " è stato aggiornato correttamente");
        return updateUser;
    }

    public void findByIdAndDelete(UUID userId) {
        User found = this.findById(userId);
        this.userRepository.delete(found);
    }

    public User becomeSeller(UUID userId) {
        User user = findById(userId);

        if (user.getRole() == Role.SELLER) {
            throw new BadRequestException("L'utente è già un venditore");
        }

        if (user.getRole() == Role.ADMIN) {
            throw new BadRequestException("Un admin non può diventare seller");
        }
        user.setRole(Role.SELLER);
        return userRepository.save(user);
    }

    public Page<User> findAll(int page, int size, String sortBy) {
        if (size > 10 || size < 0) size = 10;
        if (page < 0) page = 0;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return this.userRepository.findAll(pageable);
    }



}
