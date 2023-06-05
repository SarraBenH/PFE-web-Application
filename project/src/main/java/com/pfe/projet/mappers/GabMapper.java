package com.pfe.projet.mappers;


import com.pfe.projet.dtos.requests.GabRequest;
import com.pfe.projet.dtos.responses.GabResponse;
import com.pfe.projet.models.Gab;
import com.pfe.projet.models.Alert;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Component;

@Component
public class GabMapper {

    public static Optional<Gab>  convertGabRequestToGab(GabRequest gabRequest) {
        if (gabRequest == null) {
            return Optional.empty();
        }

    	Gab gab = new Gab();
        gab.setStatutGab(gabRequest.getStatutGab());
        gab.setEnseigne(gabRequest.getEnseigne());
        gab.setAddress(gabRequest.getAddress());
        gab.setLatitude(gabRequest.getLatitude());
        gab.setLongitude(gabRequest.getLongitude());
        gab.setEtatK1(gabRequest.getEtatK1());
        gab.setEtatK2(gabRequest.getEtatK2());
        gab.setEtatK3(gabRequest.getEtatK3());
        gab.setEtatK4(gabRequest.getEtatK4());
        gab.setCity(gabRequest.getCity());
        gab.setEtatSuppK1(gabRequest.getEtatSuppK1());
        gab.setEtatSuppK2(gabRequest.getEtatSuppK2());
        gab.setEtatSuppK3(gabRequest.getEtatSuppK3());
        gab.setEtatSuppK4(gabRequest.getEtatSuppK4());
        gab.setEtatSuppJournal(gabRequest.getEtatSuppJournal());
        gab.setEtatSuppTicket(gabRequest.getEtatSuppTicket());
        gab.setEtatTicketClient(gabRequest.getEtatTicketClient());
        
        gab.setEtatCoffre(gabRequest.getEtatCoffre());
        gab.setEtatSuppCoffre(gabRequest.getEtatSuppCoffre());


        gab.setJdab(gabRequest.getJdab());
        gab.setEtatCommunication(gabRequest.getEtatCommunication());
        gab.setIdentifiant(gabRequest.getIdentifiant());
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
        gabResponse.setStatutGab(gab.getStatutGab());
        gabResponse.setEnseigne(gab.getEnseigne());
        gabResponse.setJdab(gab.getJdab());
        gabResponse.setEtatCommunication(gab.getEtatCommunication());
        gabResponse.setAddress(gab.getAddress());
        gabResponse.setLatitude(gab.getLatitude());
        gabResponse.setLongitude(gab.getLongitude());

        gabResponse.setEtatK1(gab.getEtatK1());
        gabResponse.setEtatK2(gab.getEtatK2());
        gabResponse.setEtatK3(gab.getEtatK3());
        gabResponse.setEtatK4(gab.getEtatK4());
        gabResponse.setCity(gab.getCity());

        gabResponse.setEtatSuppJournal(gab.getEtatSuppJournal());
        gabResponse.setEtatSuppK1(gab.getEtatSuppK1());
        gabResponse.setEtatSuppK2(gab.getEtatSuppK2());
        gabResponse.setEtatSuppK3(gab.getEtatSuppK3());
        gabResponse.setEtatSuppK4(gab.getEtatSuppK4());
        gabResponse.setEtatSuppTicket(gab.getEtatSuppTicket());
        gabResponse.setEtatTicketClient(gab.getEtatTicketClient());
        
        gabResponse.setEtatCoffre(gab.getEtatCoffre());
        gabResponse.setEtatSuppCoffre(gab.getEtatSuppCoffre());

        



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

