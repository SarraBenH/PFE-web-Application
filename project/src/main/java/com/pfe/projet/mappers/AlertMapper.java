package com.pfe.projet.mappers;

import com.pfe.projet.dtos.requests.AlertRequest;
import com.pfe.projet.dtos.responses.AlertResponse;
import com.pfe.projet.models.Alert;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AlertMapper {

    public static  Optional<Alert> toAlert(AlertRequest alertRequest) {
        if (alertRequest == null) {
            return Optional.empty();
        }
        Alert alert = new Alert();
        // Map fields from alertRequest to alert
        alert.setMessage(alertRequest.getMessage());
       // alert.setGab(alertRequest.getGab());
        alert.setDateAlerte(alertRequest.getDateAlerte());
        alert.setEtatAlerte(alertRequest.getEtatAlerte());
        alert.setEmailSent(alertRequest.isEmailSent());
        // ... other fields mapping
        
        return Optional.of(alert);
    }

    public static Optional<AlertResponse> toAlertResponse(Alert alert) {
        if (alert == null) {
            return Optional.empty();
        }
        AlertResponse alertResponse = new AlertResponse();
        // Map fields from alert to alertResponse
        alertResponse.setId(alert.getId());
        alertResponse.setMessage(alert.getMessage());
       // alertResponse.setGab_id(alert.getGab().getId());
        alertResponse.setDateAlerte(alert.getDateAlerte());
        alertResponse.setEtatAlerte(alert.getEtatAlerte());
        alertResponse.setEmailSent(alert.getEmailSent());
        // ... other fields mapping
        
        return Optional.of(alertResponse);
    }

}
