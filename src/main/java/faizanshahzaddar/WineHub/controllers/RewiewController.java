package faizanshahzaddar.WineHub.controllers;

import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.payloads.RewiewDTO;
import faizanshahzaddar.WineHub.payloads.RewiewRespDTO;
import faizanshahzaddar.WineHub.services.RewiewService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/reviews")
public class RewiewController {

    private final RewiewService rewiewService;

    public RewiewController(RewiewService rewiewService) {
        this.rewiewService = rewiewService;
    }


    @PostMapping("/{wineId}")
    @ResponseStatus(HttpStatus.CREATED)
    public RewiewRespDTO save(
            @PathVariable UUID wineId,
            @RequestBody @Validated RewiewDTO body,
            @AuthenticationPrincipal User currentUser
    ) {
        return this.rewiewService.save(wineId, body, currentUser);
    }

    @GetMapping("/{wineId}")
    public List<RewiewRespDTO> findByWine(
            @PathVariable UUID wineId
    ) {
        return this.rewiewService.findByWine(wineId);
    }

    @DeleteMapping("/{reviewId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void findByIdAndDelete(
            @PathVariable UUID reviewId,
            @AuthenticationPrincipal User currentUser
    ) {
        this.rewiewService.findByIdAndDelete(reviewId, currentUser);
    }
}
