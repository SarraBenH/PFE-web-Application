package com.pfe.projet.services;

import com.pfe.projet.dtos.requests.TransactionRequest;
import com.pfe.projet.dtos.responses.GabResponse;
import com.pfe.projet.dtos.responses.TransactionResponse;
import com.pfe.projet.mappers.GabMapper;
import com.pfe.projet.mappers.TransactionMapper;
import com.pfe.projet.models.Gab;
import com.pfe.projet.models.Transaction;
import com.pfe.projet.repositories.TransactionRepository;
import com.pfe.projet.services.TransactionService;

import lombok.Data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public PageResponse getAllTransactions(Integer page , Integer size) {
        Page<Transaction> transactions = transactionRepository.findAll(PageRequest.of(page, size, Sort.Direction.ASC, "id"));
        PageResponse response = new PageResponse();
        List<TransactionResponse> transactionResponseList = new ArrayList<>();
        transactions.getContent().forEach((transaction)->{
            Optional<TransactionResponse> optionalTransactionResponse = TransactionMapper.toTransactionResponse(transaction);
            optionalTransactionResponse.ifPresent(transactionResponseList::add);
        });
        response.setResponse(transactionResponseList);
        response.setTotalRows(transactions.getTotalElements());
        
        return response;
    }
    @Override
    public Map<String, Integer> getTransactionCountForLast9Months() {
        Map<String, Integer> transactionCountByMonth = new HashMap<>();

        LocalDate now = LocalDate.now();
        for (int i = 0; i < 9; i++) {
            String month = String.valueOf(String.format("%02d", now.minusMonths(i).getMonth().ordinal()+1));
            String pattern = month+"/"+ now.minusMonths(i).getYear();
            int transactionCount = transactionRepository.countByMonth(pattern);
            transactionCountByMonth.put(month, transactionCount);
        }

        return transactionCountByMonth;
    }


    @Override
    public Optional<TransactionResponse> getTransactionById(Long id) {
        Optional<Transaction> transactionOptional = transactionRepository.findById(id);
        if(transactionOptional.isPresent()) {
            return TransactionMapper.toTransactionResponse(transactionOptional.get());
 
        }
        return Optional.empty();
    }

    @Override
    public Optional<TransactionResponse> updateTransaction(Long id, TransactionRequest transactionRequest) {
        Optional<Transaction> transactionOptional = transactionRepository.findById(id);
        if (!transactionOptional.isPresent()) {
            return Optional.empty();
        }
        Transaction transaction = TransactionMapper.toTransaction(transactionRequest).get();
        transaction.setId(id);
        Transaction updatedTransaction = transactionRepository.save(transaction);
        return TransactionMapper.toTransactionResponse(updatedTransaction);
    }

    @Override
    public void deleteTransactionById(Long id) {
        if(transactionRepository.existsById(id)) {
            transactionRepository.deleteById(id);
        }
       
    }
    @Override
    public void deleteTransactionsByIds(List<Long> ids) {
    	if(!ids.isEmpty()) {
    		ids.forEach((id) -> {
    			deleteTransactionById(id) ;
    		});
    	}
    }

    @Override
    public List<Map<String, Long>> getMostRepresentedBankBrands() {
        return transactionRepository.getMostRepresentedBankBrands();
    }

    @Override
    public List<Map<String, Long>> getMostCommonExtendedMessageResponse() {
        return transactionRepository.getMostCommonExtendedMessageResponse();
    }
    @Override
    public Double getMeanAmount() {
        return transactionRepository.findMeanAmount();
    }
    @Override
    public List<Map<String, Double>> getTransactionTypePercentage() {
        return transactionRepository.findTransactionTypePercentage();
    }

    @Override
    public Double getTotalAmount() {
        return transactionRepository.findTotalAmount();
    }

    @Data
	public static class PageResponse {
   	List <TransactionResponse> response;
   	Long totalRows;
   }
}
       
