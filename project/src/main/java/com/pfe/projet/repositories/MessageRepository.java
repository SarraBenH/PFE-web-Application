package com.pfe.projet.repositories;

import com.pfe.projet.models.Alert;
import com.pfe.projet.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT a FROM Message a WHERE a.dateMessage < :oneWeekAgo")
    List<Message> getOldMessages(@Param("oneWeekAgo") Instant oneWeekAgo);

    @Query("SELECT a FROM Message a WHERE a.target = :target")
    List<Message> getAllByTarget(@Param("target") String target);
}
