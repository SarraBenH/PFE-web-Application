package com.pfe.projet.services;

import java.util.List;
import java.util.Optional;

import com.pfe.projet.dtos.requests.AlertRequest;
import com.pfe.projet.dtos.responses.AlertResponse;
import com.pfe.projet.dtos.responses.GabResponse;

public interface AlertService {

	Optional<AlertResponse>  createAlert (AlertRequest alertRequest) ;
	Optional<AlertResponse>  getAlertById(Long id) ;
	void deleteAlertsByIds(List<Long> ids);
	void  deleteAlertById(Long id) ;
	List<AlertResponse> getAllAlerts() ;
	void updateAlertEmail(List<Long> ids) ;
}
