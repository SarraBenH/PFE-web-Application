package com.pfe.projet.services;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

import com.pfe.projet.models.User;
import com.pfe.projet.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.pfe.projet.dtos.requests.AlertRequest;
import com.pfe.projet.dtos.responses.AlertResponse;
import com.pfe.projet.dtos.responses.GabResponse;
import com.pfe.projet.mappers.AlertMapper;
import com.pfe.projet.mappers.GabMapper;
import com.pfe.projet.models.Alert;
import com.pfe.projet.models.Gab;
import com.pfe.projet.repositories.AlertRepository;
import org.springframework.util.CollectionUtils;

@Service
public class AlertServiceImpl implements AlertService {
	private static final long ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // en millisecondes

	@Autowired
	private AlertRepository alertRepo ;

	@Autowired
	private UserRepository userRepository ;

	@Override
	public Optional<AlertResponse> createAlert(AlertRequest alertRequest) {
		  Optional<Alert> optionalAlert = AlertMapper.toAlert(alertRequest);
	        if(optionalAlert.isPresent()) {
	           Alert alert = alertRepo.save(optionalAlert.get());
	            return AlertMapper.toAlertResponse(alert);
	        }
	    return Optional.empty();
	}

	@Override
	public Optional<AlertResponse> getAlertById(Long id) {
		  Optional<Alert> alertOptional = alertRepo.findById(id);
	        if(alertOptional.isPresent()) {
	            return AlertMapper.toAlertResponse(alertOptional.get());
}
	        return Optional.empty();
	}

	@Override
	public void deleteAlertsByIds(List<Long> ids) {
		if(!ids.isEmpty()) {
			ids.forEach((id) -> {
				deleteAlertById(id);
			});
		}
	}

	@Override
	public void deleteAlertById(Long id) {
		if(alertRepo.existsById(id)) {
			alertRepo.deleteById(id);
		}
	}

	@Override
	public List<AlertResponse> getAllAlerts() {

		  List<Alert> alerts = alertRepo.findAll();
	        List<AlertResponse> alertResponseList = new ArrayList<>();
	        alerts.forEach((alert)->{
	            Optional<AlertResponse> optionalAlertResponse = AlertMapper.toAlertResponse(alert);
	            optionalAlertResponse.ifPresent(alertResponseList::add);
	        });
	        return alertResponseList;
	}
	
	@Override
	public void updateAlertEmail(List<Long> ids) {
	    if(!ids.isEmpty()) {
	    	ids.forEach((id) -> {
	    		Optional<Alert> optionalAlert = alertRepo.findById(id) ;
	    		if(optionalAlert.isPresent()) {
	    			Alert alert =optionalAlert.get() ;
	    			alert.setEmailSent(true);
	    		    alertRepo.save(alert);
	    		}
	    	});
	    }
	}

	@Scheduled(fixedRate = 3600000) // toutes les heures
	public void cleanupAlerts() {
		// Supprimer les alertes de plus d'une semaine
		Instant oneWeekAgo = Instant.now().minusMillis(ONE_WEEK);
		List<Alert> oldAlerts = alertRepo.getOldAlerts(oneWeekAgo);
		if (!CollectionUtils.isEmpty(oldAlerts)){
			alertRepo.deleteAll(oldAlerts);
			// Mettre à jour les alert_ids des utilisateurs
			List<User> users = userRepository.findAll();
			for (User user : users) {
				if (user.getAlert_ids()!=null){
					List<Long> alertIds = Arrays.asList(user.getAlert_ids());
					List<Long> oldAlertIds = oldAlerts.stream().map(Alert::getId).collect(Collectors.toList());
					alertIds = alertIds.stream().filter((oldAlertIds::contains)).collect(Collectors.toList());
					if (CollectionUtils.isEmpty(alertIds)){
						user.setAlert_ids(null);
					}else{
						user.setAlert_ids(alertIds.toArray(new Long[0]));
					}
					userRepository.save(user);
				}

			}
		}

	}

}
