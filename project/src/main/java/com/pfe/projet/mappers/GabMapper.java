package com.pfe.projet.mappers;


import com.pfe.projet.dtos.requests.GabRequest;
import com.pfe.projet.dtos.responses.GabResponse;
import com.pfe.projet.models.Gab;
import com.pfe.projet.models.Alert;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

public class GabMapper {

    public static Optional<Gab>  convertGabRequestToGab(GabRequest gabRequest) {
        if (gabRequest == null) {
            return Optional.empty();
        }

    	Gab gab = new Gab();
        gab.setEtatService(gabRequest.getEtatService());
        gab.setEtatGab(gabRequest.getEtatGab());
        gab.setEnseigne(gabRequest.getEnseigne());
        gab.setEtatK7(gabRequest.getEtatK7());
        gab.setJDAB(gabRequest.getJDAB());
        gab.setEtatCommunication(gabRequest.getEtatCommunication());
        gab.setIdentifiant(gabRequest.getIdentifiant());
        gab.setEtatKeys(gabRequest.getEtatKeys());
        Set<Alert> alerts = new HashSet<>();
     /*   if (gabRequest.getAlerts() != null) {
            for (Alert alert : gabRequest.getAlerts()) {
                alerts.add(alert);
            }
        }
        gab.setAlerts(alerts);*/
        return Optional.of(gab);
    }

    public static Optional<GabResponse> convertGabToGabResponse(Gab gab) {
    	
    	 if (gab == null) {
             return Optional.empty();
         }
        GabResponse gabResponse = new GabResponse();
        gabResponse.setId(gab.getId());
        gabResponse.setIdentifiant(gab.getIdentifiant());
        gabResponse.setEtatService(gab.getEtatService());
        gabResponse.setEtatGab(gab.getEtatGab());
        gabResponse.setEnseigne(gab.getEnseigne());
        gabResponse.setEtatK7(gab.getEtatK7());
        gabResponse.setJDAB(gab.getJDAB());
        gabResponse.setEtatCommunication(gab.getEtatCommunication());
        gabResponse.setEtatKeys(gab.getEtatKeys());
        Set<Alert> alerts = new HashSet<>();
      /*  if (gab.getAlerts() != null) {
            for (Alert alert : gab.getAlerts()) {
                alerts.add(alert);
            }
        }
        gabResponse.setAlerts(alerts);*/
        return Optional.of(gabResponse);
    }
}

