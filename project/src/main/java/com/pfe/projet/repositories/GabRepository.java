package com.pfe.projet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projet.models.Gab;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface GabRepository extends JpaRepository<Gab, Long>{

    @Query(value = "SELECT t.address, COUNT(*) AS count FROM GAB t WHERE t.etat_gab = 'IN_SERVICE' GROUP BY t.address, t.etat_gab ORDER BY count DESC LIMIT 3",nativeQuery = true)
    List<Map<String, Long>> getMostSuccessfulCity();

    @Query(value = "SELECT t.address, COUNT(*) AS count FROM GAB t WHERE t.etat_gab = 'OUT_OF_SERVICE' GROUP BY t.address, t.etat_gab ORDER BY count DESC LIMIT 3",nativeQuery = true)
    List<Map<String, Long>> getWorstCity();
}
