package com.pfe.projet.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projet.repositories.CassetteRepository;
import com.pfe.projet.dtos.requests.CassetteRequest;
import com.pfe.projet.dtos.responses.CassetteResponse;
import com.pfe.projet.mappers.CassetteMapper;
import com.pfe.projet.models.Cassette;

@Service
public class CassetteServiceImpl implements CassetteService {

    @Autowired
    private CassetteRepository cassetteRepository;

    @Override
    public Optional<CassetteResponse> createCassette(CassetteRequest cassetteRequest) {
        Optional<Cassette> optionalCassette = CassetteMapper.convertCassetteRequestToCassette(cassetteRequest);
        if (optionalCassette.isPresent()) {
            Cassette cassette = cassetteRepository.save(optionalCassette.get());
            return CassetteMapper.convertCassetteToCassetteResponse(cassette);
        }
        return Optional.empty();
    }

    @Override
    public Optional<CassetteResponse> getCassetteById(Long id) {
        Optional<Cassette> cassetteOptional = cassetteRepository.findById(id);
        if (cassetteOptional.isPresent()) {
            return CassetteMapper.convertCassetteToCassetteResponse(cassetteOptional.get());
        }
        return Optional.empty();
    }

    @Override
    public List<CassetteResponse> getAllCassettes() {
        List<Cassette> cassettes = cassetteRepository.findAll();
        List<CassetteResponse> cassetteResponseList = new ArrayList<>();
        cassettes.forEach(cassette -> {
            Optional<CassetteResponse> optionalCassetteResponse = CassetteMapper.convertCassetteToCassetteResponse(cassette);
            optionalCassetteResponse.ifPresent(cassetteResponseList::add);
        });
        return cassetteResponseList;
    }

    @Override
    public void deleteCassetteById(Long id) {
        if (cassetteRepository.existsById(id)) {
            cassetteRepository.deleteById(id);
        }
    }

    @Override
    public void deleteCassettesByIds(List<Long> ids) {
        if (!ids.isEmpty()) {
            ids.forEach(this::deleteCassetteById);
        }
    }

    @Override
    public Optional<CassetteResponse> editCassetteById(Long id, CassetteRequest cassetteRequest) {
        Optional<Cassette> optionalCassette = cassetteRepository.findById(id);
        if (optionalCassette.isPresent()) {
            Cassette cassetteToUpdate = optionalCassette.get();
            if (cassetteRequest != null) {
                if (cassetteRequest.getEnseigneGab() != null && !cassetteRequest.getEnseigneGab().isEmpty()) {
                    cassetteToUpdate.setEnseigneGab(cassetteRequest.getEnseigneGab());
                }
                if (cassetteRequest.getLastDateCharged() != null && !cassetteRequest.getLastDateCharged().isEmpty()) {
                    cassetteToUpdate.setLastDateCharged(cassetteRequest.getLastDateCharged());
                }
                if (cassetteRequest.getMontantCharged() != null && !cassetteRequest.getMontantCharged().isEmpty()) {
                    cassetteToUpdate.setMontantCharged(cassetteRequest.getMontantCharged());
                }
                if (cassetteRequest.getMontantDecharged() != null && !cassetteRequest.getMontantDecharged().isEmpty()) {
                    cassetteToUpdate.setMontantDecharged(cassetteRequest.getMontantDecharged());
                }
                if (cassetteRequest.getMontantDe() != null && !cassetteRequest.getMontantDe().isEmpty()) {
                    cassetteToUpdate.setMontantDe(cassetteRequest.getMontantDe());
                }
                if (cassetteRequest.getMontantEx() != null && !cassetteRequest.getMontantEx().isEmpty()) {
                    cassetteToUpdate.setMontantEx(cassetteRequest.getMontantEx());
                }
                
                if (cassetteRequest.getNumGab() != null && !cassetteRequest.getNumGab().isEmpty()) {
                    cassetteToUpdate.setNumGab(cassetteRequest.getNumGab());
                }
                if (cassetteRequest.getSoldeK71() != null && !cassetteRequest.getSoldeK71().isEmpty()) {
                    cassetteToUpdate.setSoldeK71(cassetteRequest.getSoldeK71());
                }
                if (cassetteRequest.getSoldeK72() != null && !cassetteRequest.getSoldeK72().isEmpty()) {
                    cassetteToUpdate.setSoldeK72(cassetteRequest.getSoldeK72());
                }
                if (cassetteRequest.getSoldeK73() != null && !cassetteRequest.getSoldeK73().isEmpty()) {
                    cassetteToUpdate.setSoldeK73(cassetteRequest.getSoldeK73());
                }
                if (cassetteRequest.getSoldeK74() != null && !cassetteRequest.getSoldeK74().isEmpty()) {
                    cassetteToUpdate.setSoldeK74(cassetteRequest.getSoldeK74());
                }
                if (cassetteRequest.getValeurk71() != null && !cassetteRequest.getValeurk71().isEmpty()) {
                    cassetteToUpdate.setValeurk71(cassetteRequest.getValeurk71());
                }
                if (cassetteRequest.getValeurK72() != null && !cassetteRequest.getValeurK72().isEmpty()) {
                    cassetteToUpdate.setValeurK72(cassetteRequest.getValeurK72());
                }
                if (cassetteRequest.getValeurK73() != null && !cassetteRequest.getValeurK73().isEmpty()) {
                    cassetteToUpdate.setValeurK73(cassetteRequest.getValeurK73());
                }
                if (cassetteRequest.getValeurK74() != null && !cassetteRequest.getValeurK74().isEmpty()) {
                    cassetteToUpdate.setValeurK74(cassetteRequest.getValeurK74());
                }
                
                if (cassetteRequest.getTotalCoffre() != null && !cassetteRequest.getTotalCoffre().isEmpty()) {
                    cassetteToUpdate.setTotalCoffre(cassetteRequest.getTotalCoffre());
                }
                
                // Update other attributes as needed

                Cassette savedCassette = cassetteRepository.save(cassetteToUpdate);
                return CassetteMapper.convertCassetteToCassetteResponse(savedCassette);
            }
        }
        return Optional.empty();
    }
}

