package faizanshahzaddar.WineHub.securities;

import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
public class TokenFilter extends OncePerRequestFilter {
    private final TokenTools tokenTools;
    private final UserService userService;

    public TokenFilter(TokenTools tokenTools, UserService userService) {
        this.tokenTools = tokenTools;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = authHeader.replace("Bearer ", "");

        tokenTools.verifyToken(accessToken);

        UUID userId = this.tokenTools.extractIdFromToken(accessToken);

        User authenticatedUser = this.userService.findById(userId);

        Authentication authentication = new UsernamePasswordAuthenticationToken(authenticatedUser, null, authenticatedUser.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);

        request.setAttribute("user", authenticatedUser);

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        return new AntPathMatcher().match("/auth/**", request.getServletPath());
    }
}