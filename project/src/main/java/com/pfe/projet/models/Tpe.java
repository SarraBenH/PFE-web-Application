package com.pfe.projet.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="TPE")
@Data
public class Tpe {
	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name="LAST_TRX_CODE")
	private String lastTrxCode ;
	
	@Column(name="LAST_TRX_TYPE")
	private String lastTrxType ;
	
	@Column(name="SPH_REQU_SYST_TIME_RECEIVED")
	private String sphTimeReceived ;
	
	@Column(name="SPH_TERMINALID")
	private String SphTerminalId ;
	
	@Column(name="SPH_ATP_NAME")
	private String sphAtpName ;
	
	@Column(name="SPH_CARD_ACCP_ID_CODE_F042")
	private String sphCard ;
	
	@Column(name="SPH_MER_CORP_NAME")
	private String sphMer ;
	
	@Column(name="SPH_IS_REVERSAL")
	private String sphIsREVERSAL ;
	
	
	
	

}
