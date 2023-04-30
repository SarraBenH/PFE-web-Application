package com.pfe.projet.dtos.requests;

import lombok.Data;

@Data
public class TransactionRequest {
    private String dateOperation;
    private String numeroCarte;
    private String bin;
    private String typeOperation;
    private String montantOperation;
    private String codeReponse;
    private String statutOperation;
    private String extendedCodeReponse;
    private String extendedMsgReponse;
    private String codeTerminal;
    private String codeAffilie;
    private String enseigne;
    private String pays;
    private String mcc;
    private String typeTransaction;

}

