package com.pfe.projet.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projet.models.Transaction;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction , Long> {


    @Query("SELECT count(t) FROM Transaction t WHERE lower(t.dateOperation) LIKE %:month%")
    int countByMonth(@Param("month") String month);
}
