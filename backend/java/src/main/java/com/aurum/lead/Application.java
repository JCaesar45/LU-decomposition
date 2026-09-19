package com.aurum.lead;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;
import java.util.Map;
import java.util.UUID;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "*")
public class Application {
    private static final String SECRET = System.getenv().getOrDefault("LEAD_HMAC_SECRET", "dev-secret");

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @GetMapping("/healthz")
    public Map<String, String> healthz() {
        return Map.of("status", "ok");
    }

    @PostMapping("/api/leads")
    public ResponseEntity<Map<String, Object>> createLead(@Valid @RequestBody LeadRequest request) {
        LeadPayload payload = request.payload();

        String canonical = String.join(
                "\n",
                payload.name(),
                payload.email(),
                payload.company(),
                String.valueOf(payload.budget()),
                String.valueOf(payload.timeline()),
                String.valueOf(payload.team()),
                payload.message(),
                String.valueOf(request.assessment().score()),
                request.assessment().tier()
        );

        String integrity = hmacSha256(canonical);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "status", "accepted",
                "id", UUID.randomUUID().toString(),
                "integrity", integrity,
                "score", request.assessment().score()
        ));
    }

    private String hmacSha256(String canonical) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(SECRET.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] digest = mac.doFinal(canonical.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest);
        } catch (Exception ex) {
            throw new IllegalStateException("HMAC computation failed.", ex);
        }
    }

    public record LeadPayload(
            @NotBlank String name,
            @NotBlank @Email String email,
            @NotBlank String company,
            @Min(0) @Max(100) int budget,
            @Min(0) @Max(100) int timeline,
            @Min(0) @Max(100) int team,
            @NotBlank String message
    ) {
    }

    public record Assessment(
            @Min(0) @Max(100) int score,
            @NotBlank String tier
    ) {
    }

    public record LeadRequest(
            @Valid @NotNull LeadPayload payload,
            @Valid @NotNull Assessment assessment
    ) {
    }
}
