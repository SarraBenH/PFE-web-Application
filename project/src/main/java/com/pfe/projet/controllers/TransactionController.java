package com.pfe.projet.controllers;

import com.pfe.projet.dtos.requests.TransactionRequest;
import com.pfe.projet.dtos.responses.TransactionResponse;
import com.pfe.projet.services.TransactionService;
import com.pfe.projet.services.TransactionServiceImpl.PageResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/transactions")
    public ResponseEntity<PageResponse> getAllTransactions(@RequestParam int page , @RequestParam int size) {
        PageResponse transactionResponses = transactionService.getAllTransactions(page , size);
        if (transactionResponses == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(transactionResponses);
    }

    @GetMapping("transactions/{id}")
    public ResponseEntity<TransactionResponse> getTransactionById(@PathVariable Long id) {
    	 return ResponseEntity.of(transactionService.getTransactionById(id)); 
    }

    @PutMapping("transactions/{id}")
    public ResponseEntity<TransactionResponse> updateTransaction(@PathVariable Long id, @RequestBody TransactionRequest transactionRequest) {
    	  return ResponseEntity.of(transactionService.updateTransaction(id , transactionRequest)) ;
    }

    @DeleteMapping("transactions")
    public void deleteTransactionsByIds(@RequestBody List<Long> ids) {
        transactionService.deleteTransactionsByIds(ids);
     
    }
}
