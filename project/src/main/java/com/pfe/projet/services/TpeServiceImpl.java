package com.pfe.projet.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projet.dtos.requests.TpeRequest;
import com.pfe.projet.dtos.responses.TpeResponse;
import com.pfe.projet.mappers.TpeMapper;
import com.pfe.projet.models.Tpe;
import com.pfe.projet.repositories.TpeRepository;

@Service
public class TpeServiceImpl implements TpeService {
	
	@Autowired
    private TpeRepository tpeRespository ;

	@Override
	public Optional<TpeResponse> createTpe(TpeRequest tpeRequest) {
	      Optional<Tpe> optionalTpe = TpeMapper.convertTPERequestToTPE(tpeRequest);
	        if (optionalTpe.isPresent()) {
	            Tpe tpe = tpeRespository.save(optionalTpe.get());
	            return TpeMapper.convertTpeToTpeResponse(tpe);
	        }
	        return Optional.empty();
	}

	@Override
	public Optional<TpeResponse> getTpeById(Long id) {
	    Optional<Tpe> tpeOptional = tpeRespository.findById(id);
        if (tpeOptional.isPresent()) {
            return TpeMapper.convertTpeToTpeResponse(tpeOptional.get());
        }
        return Optional.empty();
	}

	@Override
	public List<TpeResponse> getAllTpe() {
	     List<Tpe> tpes = tpeRespository.findAll();
	        List<TpeResponse> tpeResponseList = new ArrayList<>();
	        tpes.forEach(tpe -> {
	            Optional<TpeResponse> optionalTpeResponse = TpeMapper.convertTpeToTpeResponse(tpe);
	            optionalTpeResponse.ifPresent(tpeResponseList::add);
	        });
	        return tpeResponseList;
	}

	@Override
	public Optional<TpeResponse> editTpeById(Long id, TpeRequest tpeRequest) {
		   Optional<Tpe> optionalTpe = tpeRespository.findById(id);
	        if (optionalTpe.isPresent()) {
	            Tpe tpeToUpdate = optionalTpe.get();
	            if (tpeRequest != null) {
	                if (tpeRequest.getLastTrxCode() != null && !tpeRequest.getLastTrxCode().isEmpty()) {
	                	tpeToUpdate.setLastTrxCode(tpeRequest.getLastTrxCode());
	                }
	                
	                if (tpeRequest.getLastTrxType() != null && !tpeRequest.getLastTrxType().isEmpty()) {
	                	tpeToUpdate.setLastTrxType(tpeRequest.getLastTrxType());
	                }
	                if (tpeRequest.getSphAtpName() != null && !tpeRequest.getSphAtpName().isEmpty()) {
	                	tpeToUpdate.setSphAtpName(tpeRequest.getSphAtpName());
	                }
	                if (tpeRequest.getSphCard() != null && !tpeRequest.getSphCard().isEmpty()) {
	                	tpeToUpdate.setSphCard(tpeRequest.getSphCard());
	                }
	                if (tpeRequest.getSphIsREVERSAL() != null && !tpeRequest.getSphIsREVERSAL().isEmpty()) {
	                	tpeToUpdate.setSphIsREVERSAL(tpeRequest.getSphIsREVERSAL());
	                }
	                if (tpeRequest.getSphMer() != null && !tpeRequest.getSphMer().isEmpty()) {
	                	tpeToUpdate.setSphMer(tpeRequest.getSphMer());
	                }
	                if (tpeRequest.getSphTerminalId() != null && !tpeRequest.getSphTerminalId().isEmpty()) {
	                	tpeToUpdate.setSphTerminalId(tpeRequest.getSphTerminalId());
	                }
	                
	                if (tpeRequest.getSphTimeReceived() != null && !tpeRequest.getSphTimeReceived().isEmpty()) {
	                	tpeToUpdate.setSphTimeReceived(tpeRequest.getSphTimeReceived());
	                }
	                              
	           
}
	                
	                Tpe savedTpe = tpeRespository.save(tpeToUpdate) ;
	                return TpeMapper.convertTpeToTpeResponse(savedTpe);
	            }
	        
	        return Optional.empty();
	    }


	@Override
	public void deleteTpeById(Long id) {
		   if (tpeRespository.existsById(id)) {
			   tpeRespository.deleteById(id);
	        }
		
	}

	@Override
	public void deleteTpesByIds(List<Long> ids) {
		   if (!ids.isEmpty()) {
	            ids.forEach(this::deleteTpeById);
	        }		
	}

}
