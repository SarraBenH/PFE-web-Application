package com.pfe.projet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projet.models.Gab;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface GabRepository extends JpaRepository<Gab, Long>{

    @Query(value = "SELECT t.city, COUNT(*) AS count FROM GAB t WHERE t.statut_gab = '1' GROUP BY t.city, t.statut_gab ORDER BY count DESC LIMIT 3",nativeQuery = true)
    List<Map<String, Long>> getMostSuccessfulCity();

    @Query(value = "SELECT t.city, COUNT(*) AS count FROM GAB t WHERE t.statut_gab = '2' GROUP BY t.city, t.statut_gab ORDER BY count DESC LIMIT 3",nativeQuery = true)
    List<Map<String, Long>> getWorstCity();
}
