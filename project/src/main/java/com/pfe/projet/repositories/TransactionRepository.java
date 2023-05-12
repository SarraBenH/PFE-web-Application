package com.pfe.projet.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projet.models.Transaction;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface TransactionRepository extends JpaRepository<Transaction , Long> {


    @Query("SELECT count(t) FROM Transaction t WHERE lower(t.dateOperation) LIKE %:month%")
    int countByMonth(@Param("month") String month);

    @Query(value = "SELECT t.enseigne, COUNT(t.enseigne) as count FROM Transaction t GROUP BY t.enseigne ORDER BY COUNT(t.enseigne) DESC LIMIT 3",nativeQuery = true)
    List<Map<String, Long>> getMostRepresentedBankBrands();

    @Query(value = "SELECT t.extended_msg_reponse, COUNT(t.extended_msg_reponse) as count FROM Transaction t GROUP BY t.extended_msg_reponse ORDER BY COUNT(t.extended_msg_reponse) DESC LIMIT 5",nativeQuery = true)
    List<Map<String, Long>> getMostCommonExtendedMessageResponse();

    @Query("SELECT AVG(CAST(t.montantOperation AS double)) FROM Transaction t")
    Double findMeanAmount();

    @Query("SELECT SUM(CAST(t.montantOperation AS double)) FROM Transaction t")
    Double findTotalAmount();

    @Query(value = "SELECT t.type_transaction, COUNT(t.type_transaction) * 100.0 / (SELECT COUNT(*) FROM Transaction) as count  FROM Transaction t GROUP BY t.type_transaction",nativeQuery = true)
    List<Map<String, Double>> findTransactionTypePercentage();
}
