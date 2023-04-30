package com.pfe.projet.mappers;

import com.pfe.projet.dtos.requests.TransactionRequest;
import com.pfe.projet.dtos.responses.TransactionResponse;
import com.pfe.projet.models.Transaction;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class TransactionMapper {

    public static Optional<Transaction> toTransaction(TransactionRequest transactionRequest) {
        if (transactionRequest == null) {
            return Optional.empty();
        }
        Transaction transaction = new Transaction();
        // Map fields from transactionRequest to transaction
        transaction.setDateOperation(transactionRequest.getDateOperation());
        transaction.setNumeroCarte(transactionRequest.getNumeroCarte());
        transaction.setBin(transactionRequest.getBin());
        transaction.setTypeOperation(transactionRequest.getTypeOperation());
        transaction.setMontantOperation(transactionRequest.getMontantOperation());
        transaction.setCodeReponse(transactionRequest.getCodeReponse());
        transaction.setStatutOperation(transactionRequest.getStatutOperation());
        transaction.setExtendedCodeReponse(transactionRequest.getExtendedCodeReponse());
        transaction.setExtendedMsgReponse(transactionRequest.getExtendedMsgReponse());
        transaction.setCodeTerminal(transactionRequest.getCodeTerminal());
        transaction.setCodeAffilie(transactionRequest.getCodeAffilie());
        transaction.setEnseigne(transactionRequest.getEnseigne());
        transaction.setPays(transactionRequest.getPays());
        transaction.setMcc(transactionRequest.getMcc());
        transaction.setTypeTransaction(transactionRequest.getTypeTransaction());
        // ... other fields mapping
        
        return Optional.of(transaction);
    }

    public static Optional<TransactionResponse> toTransactionResponse(Transaction transaction) {
        if (transaction == null) {
            return Optional.empty();
        }
        TransactionResponse transactionResponse = new TransactionResponse();
        // Map fields from transaction to transactionResponse
        transactionResponse.setId(transaction.getId());
        transactionResponse.setDateOperation(transaction.getDateOperation());
        transactionResponse.setNumeroCarte(transaction.getNumeroCarte());
        transactionResponse.setBin(transaction.getBin());
        transactionResponse.setTypeOperation(transaction.getTypeOperation());
        transactionResponse.setMontantOperation(transaction.getMontantOperation());
        transactionResponse.setCodeReponse(transaction.getCodeReponse());
        transactionResponse.setStatutOperation(transaction.getStatutOperation());
        transactionResponse.setExtendedCodeReponse(transaction.getExtendedCodeReponse());
        transactionResponse.setExtendedMsgReponse(transaction.getExtendedMsgReponse());
        transactionResponse.setCodeTerminal(transaction.getCodeTerminal());
        transactionResponse.setCodeAffilie(transaction.getCodeAffilie());
        transactionResponse.setEnseigne(transaction.getEnseigne());
        transactionResponse.setPays(transaction.getPays());
        transactionResponse.setMcc(transaction.getMcc());
        transactionResponse.setTypeTransaction(transaction.getTypeTransaction());
        // ... other fields mapping
        
        return Optional.of(transactionResponse);
    }

}
