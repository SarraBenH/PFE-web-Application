package com.pfe.projet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projet.models.Alert;

public interface AlertRepository extends JpaRepository<Alert, Long> {

}
