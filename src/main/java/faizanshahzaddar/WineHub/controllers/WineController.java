package faizanshahzaddar.WineHub.controllers;

import faizanshahzaddar.WineHub.entities.User;
import faizanshahzaddar.WineHub.entities.Wine;
import faizanshahzaddar.WineHub.exceptions.ValidationException;
import faizanshahzaddar.WineHub.payloads.WineDTO;
import faizanshahzaddar.WineHub.payloads.WineRespDTO;
import faizanshahzaddar.WineHub.services.WineService;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/wines")
public class WineController {

    private final WineService wineService;

    public WineController(WineService wineService) {
        this.wineService = wineService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WineRespDTO save(@RequestBody @Validated WineDTO body,
                            BindingResult validationResult,
                            @AuthenticationPrincipal User currentAuthenticatedUser) {

        if (validationResult.hasErrors()) {
            List<String> errors = validationResult.getFieldErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList();
            throw new ValidationException(errors);
        }

        Wine newWine = this.wineService.save(body, currentAuthenticatedUser);
        return new WineRespDTO(
                newWine.getId(),
                newWine.getName(),
                newWine.getDescription(),
                newWine.getPrice(),
                newWine.getWineCategory(),
                newWine.getImageUrl(),
                newWine.getUser().getId(),
                newWine.getUser().getUsername());
    }

    @GetMapping
    public Page<WineRespDTO> getWines(@RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "10") int size,
                               @RequestParam(defaultValue = "name") String sortBy) {
        return this.wineService.findAll(page, size, sortBy)
                .map(wine -> new WineRespDTO(
                        wine.getId(),
                        wine.getName(),
                        wine.getDescription(),
                        wine.getPrice(),
                        wine.getWineCategory(),
                        wine.getImageUrl(),
                        wine.getUser().getId(),
                        wine.getUser().getUsername()
                ));
    }


    @GetMapping("/me")
    public Page<WineRespDTO> getMyWines(@AuthenticationPrincipal User currentAuthenticatedUser,
                                 @RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size,
                                 @RequestParam(defaultValue = "name") String sortBy) {
        return this.wineService.findMyWines(currentAuthenticatedUser, page, size, sortBy)
                .map(wine -> new WineRespDTO(
                        wine.getId(),
                        wine.getName(),
                        wine.getDescription(),
                        wine.getPrice(),
                        wine.getWineCategory(),
                        wine.getImageUrl(),
                        wine.getUser().getId(),
                        wine.getUser().getUsername()
                ));
    }

    @GetMapping("/{wineId}")
    public WineRespDTO  getById(@PathVariable UUID wineId) {
        Wine wine = this.wineService.findById(wineId);

        return new WineRespDTO(
                wine.getId(),
                wine.getName(),
                wine.getDescription(),
                wine.getPrice(),
                wine.getWineCategory(),
                wine.getImageUrl(),
                wine.getUser().getId(),
                wine.getUser().getUsername()
        );
    }
    @PutMapping("/{wineId}")
    public WineRespDTO update(@PathVariable UUID wineId,
                              @RequestBody @Validated WineDTO body,
                              BindingResult validationResult,
                              @AuthenticationPrincipal User currentAuthenticatedUser) {

        if (validationResult.hasErrors()) {
            List<String> errors = validationResult.getFieldErrors()
                    .stream()
                    .map(error -> error.getDefaultMessage())
                    .toList();
            throw new ValidationException(errors);
        }

        Wine updatedWine = this.wineService.findByIdAndUpdate(wineId, body, currentAuthenticatedUser);

        return new WineRespDTO(
                updatedWine.getId(),
                updatedWine.getName(),
                updatedWine.getDescription(),
                updatedWine.getPrice(),
                updatedWine.getWineCategory(),
                updatedWine.getImageUrl(),
                updatedWine.getUser().getId(),
                updatedWine.getUser().getUsername()
        );
    }
    @DeleteMapping("/{wineId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID wineId,
                       @AuthenticationPrincipal User currentAuthenticatedUser) {
        this.wineService.findByIdAndDelete(wineId, currentAuthenticatedUser);
    }

    @PatchMapping("/{wineId}/image")
    public WineRespDTO uploadWineImage(@PathVariable UUID wineId,
                                       @RequestParam("image") MultipartFile file,
                                       @AuthenticationPrincipal User currentAuthenticatedUser) {

        Wine updatedWine = this.wineService.imageUpload(file, wineId, currentAuthenticatedUser);

        return new WineRespDTO(
                updatedWine.getId(),
                updatedWine.getName(),
                updatedWine.getDescription(),
                updatedWine.getPrice(),
                updatedWine.getWineCategory(),
                updatedWine.getImageUrl(),
                updatedWine.getUser().getId(),
                updatedWine.getUser().getUsername()
        );
    }

}
