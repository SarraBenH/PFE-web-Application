package com.pfe.projet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projet.models.Alert;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Long> {

    @Query("SELECT a FROM Alert a WHERE a.dateAlerte < :oneWeekAgo")
    List<Alert> getOldAlerts(@Param("oneWeekAgo") Instant oneWeekAgo);

}
