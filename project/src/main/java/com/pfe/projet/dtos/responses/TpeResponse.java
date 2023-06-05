package com.pfe.projet.dtos.responses;

import javax.persistence.Column;

import lombok.Data;

@Data
public class TpeResponse {

	private Long id ;

	private String lastTrxCode ;
	
	private String lastTrxType ;
	
	private String sphTimeReceived ;
	
	private String SphTerminalId ;
	
	private String sphAtpName ;
	
	private String sphCard ;
	
	private String sphMer ;
	
	private String sphIsREVERSAL ;
}
