package com.pfe.projet.mappers;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.pfe.projet.dtos.requests.TpeRequest;
import com.pfe.projet.dtos.responses.TpeResponse;
import com.pfe.projet.models.Tpe;

@Component
public class TpeMapper {

	 public static Optional<Tpe> convertTPERequestToTPE(TpeRequest tpeRequest) {
	        if (tpeRequest == null) {
	            return Optional.empty();
	        }

	        Tpe tpeObj = new Tpe();
	        tpeObj.setLastTrxCode(tpeRequest.getLastTrxCode());
	        tpeObj.setLastTrxType(tpeRequest.getLastTrxType());
	        tpeObj.setSphAtpName(tpeRequest.getSphAtpName());
	        tpeObj.setSphCard(tpeRequest.getSphCard());
	        tpeObj.setSphIsREVERSAL(tpeRequest.getSphIsREVERSAL());
	        tpeObj.setSphMer(tpeRequest.getSphMer());
	        tpeObj.setSphTerminalId(tpeRequest.getSphTerminalId());
	        tpeObj.setSphTimeReceived(tpeRequest.getSphTimeReceived());

	        return Optional.of(tpeObj);
	    }

	    public static Optional<TpeResponse> convertTpeToTpeResponse(Tpe tpeObj) {

	        if (tpeObj == null) {
	            return Optional.empty();
	        }

	        TpeResponse tpeResponse = new TpeResponse();
	        tpeResponse.setId(tpeObj.getId());
	        tpeResponse.setLastTrxCode(tpeObj.getLastTrxCode());
	        tpeResponse.setLastTrxType(tpeObj.getLastTrxType());
	        tpeResponse.setSphAtpName(tpeObj.getSphAtpName());
	        tpeResponse.setSphCard(tpeObj.getSphCard());
	        tpeResponse.setSphIsREVERSAL(tpeObj.getSphIsREVERSAL());
	        tpeResponse.setSphMer(tpeObj.getSphMer());
	        tpeResponse.setSphTerminalId(tpeObj.getSphTerminalId());
	        tpeResponse.setSphTimeReceived(tpeObj.getSphTimeReceived());

	        return Optional.of(tpeResponse);
	    }
}
