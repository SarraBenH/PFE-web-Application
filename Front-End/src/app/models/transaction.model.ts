export class Transaction {
    id?: number;
    DATE_OPERATION: string;
    NUMERO_CARTE: string;
    BIN: string;
    TYPE_OPERATION: string;
    MONTANT_OPERATION: string;
    CODE_REPONSE: string;
    STATUT_OPERATION: string;
    EXTENDED_CODE_REPONSE: string;
    EXTENDED_MSG_REPONSE: string;
    CODE_TERMINAL: string;
    CODE_AFFILIE: string;
    ENSEIGNE: string;
    PAYS: string;
    MCC: string;
    TYPE_TRANSACTION: string;
  
    constructor(
      DATE_OPERATION: string,
      NUMERO_CARTE: string,
      BIN: string,
      TYPE_OPERATION: string,
      MONTANT_OPERATION: string,
      CODE_REPONSE: string,
      STATUT_OPERATION: string,
      EXTENDED_CODE_REPONSE: string,
      EXTENDED_MSG_REPONSE: string,
      CODE_TERMINAL: string,
      CODE_AFFILIE: string,
      ENSEIGNE: string,
      PAYS: string,
      MCC: string,
      TYPE_TRANSACTION: string
    ) {
      this.DATE_OPERATION = DATE_OPERATION;
      this.NUMERO_CARTE = NUMERO_CARTE;
      this.BIN = BIN;
      this.TYPE_OPERATION = TYPE_OPERATION;
      this.MONTANT_OPERATION = MONTANT_OPERATION;
      this.CODE_REPONSE = CODE_REPONSE;
      this.STATUT_OPERATION = STATUT_OPERATION;
      this.EXTENDED_CODE_REPONSE = EXTENDED_CODE_REPONSE;
      this.EXTENDED_MSG_REPONSE = EXTENDED_MSG_REPONSE;
      this.CODE_TERMINAL = CODE_TERMINAL;
      this.CODE_AFFILIE = CODE_AFFILIE;
      this.ENSEIGNE = ENSEIGNE;
      this.PAYS = PAYS;
      this.MCC = MCC;
      this.TYPE_TRANSACTION = TYPE_TRANSACTION;
    }
  
    public static fromJson(jsonObj: any): Transaction {
      return new Transaction(
        jsonObj['DATE_OPERATION'],
        jsonObj['NUMERO_CARTE'],
        jsonObj['BIN'],
        jsonObj['TYPE_OPERATION'],
        jsonObj['MONTANT_OPERATION'],
        jsonObj['CODE_REPONSE'],
        jsonObj['STATUT_OPERATION'],
        jsonObj['EXTENDED_CODE_REPONSE'],
        jsonObj['EXTENDED_MSG_REPONSE'],
        jsonObj['CODE_TERMINAL'],
        jsonObj['CODE_AFFILIE'],
        jsonObj['ENSEIGNE'],
        jsonObj['PAYS'],
        jsonObj['MCC'],
        jsonObj['TYPE_TRANSACTION']
      );
    }
  }
  