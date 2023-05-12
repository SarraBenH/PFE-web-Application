package com.pfe.projet.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import com.pfe.projet.dtos.requests.TransactionRequest;
import com.pfe.projet.dtos.responses.TransactionResponse;
import com.pfe.projet.services.TransactionServiceImpl.PageResponse;

public interface TransactionService {

	 public PageResponse getAllTransactions(Integer page , Integer size);
	 public Map<String, Integer> getTransactionCountForLastSixMonths();
	 public Optional<TransactionResponse> getTransactionById(Long id);
	 public Optional<TransactionResponse> updateTransaction(Long id, TransactionRequest transactionRequest);
	 public void deleteTransactionsByIds(List<Long> ids) ;
	 public void deleteTransactionById(Long id) ;
	 public List<Map<String, Double>> getTransactionTypePercentage();
	 public Double getMeanAmount();
	public Double getTotalAmount();
	public List<Map<String, Long>> getMostCommonExtendedMessageResponse();
	public List<Map<String, Long>> getMostRepresentedBankBrands();

}
