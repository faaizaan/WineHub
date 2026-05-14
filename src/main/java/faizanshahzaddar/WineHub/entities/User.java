package faizanshahzaddar.WineHub.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import faizanshahzaddar.WineHub.enums.Role;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties({"accountNonExpired", "accountNonLocked", "authorities", "credentialsNonExpired", "enabled"})
public class User implements UserDetails {

    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String cognome;

    @Column(nullable = false)
    private String avatar;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    public User(String username, String email, String nome, String password, String cognome) {
        this.username = username;
        this.email = email;
        this.nome = nome;
        this.password = password;
        this.cognome = cognome;
        this.role = Role.USER;
        this.avatar = "https://ui-avatars.com/api/?name=" + nome + "+" + cognome;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }


}
