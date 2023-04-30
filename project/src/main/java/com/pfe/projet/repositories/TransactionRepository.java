package com.pfe.projet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projet.models.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction , Long> {

}
