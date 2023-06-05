package com.pfe.projet.dtos.requests;

import lombok.Data;

@Data
public class TpeRequest {

	private String lastTrxCode ;
	
	private String lastTrxType ;
	
	private String sphTimeReceived ;
	
	private String SphTerminalId ;
	
	private String sphAtpName ;
	
	private String sphCard ;
	
	private String sphMer ;
	
	private String sphIsREVERSAL ;
}
