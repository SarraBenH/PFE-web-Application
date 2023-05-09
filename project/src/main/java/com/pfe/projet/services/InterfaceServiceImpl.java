package com.pfe.projet.services;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projet.dtos.requests.InterfaceRequest;
import com.pfe.projet.dtos.responses.InterfaceResponse;
import com.pfe.projet.mappers.InterfaceMapper;
import com.pfe.projet.models.Interface;
import com.pfe.projet.repositories.InterfaceRepository;


@Service
public class InterfaceServiceImpl implements InterfaceService {

    @Autowired
    private InterfaceRepository interfaceRepository;

    @Override
    public Optional<InterfaceResponse> createInterface(InterfaceRequest interfaceRequest) {
        Optional<Interface> optionalInterface = InterfaceMapper.convertInterfaceRequestToInterface(interfaceRequest);
        if (optionalInterface.isPresent()) {
            Interface interfaceObj = interfaceRepository.save(optionalInterface.get());
            return InterfaceMapper.convertInterfaceToInterfaceResponse(interfaceObj);
        }
        return Optional.empty();
    }

    @Override
    public Optional<InterfaceResponse> getInterfaceById(Long id) {
        Optional<Interface> interfaceOptional = interfaceRepository.findById(id);
        if (interfaceOptional.isPresent()) {
            return InterfaceMapper.convertInterfaceToInterfaceResponse(interfaceOptional.get());
        }
        return Optional.empty();
    }

    @Override
    public List<InterfaceResponse> getAllInterfaces() {
        List<Interface> interfaces = interfaceRepository.findAll();
        List<InterfaceResponse> interfaceResponseList = new ArrayList<>();
        interfaces.forEach((interfaceObj) -> {
            Optional<InterfaceResponse> optionalInterfaceResponse = InterfaceMapper.convertInterfaceToInterfaceResponse(interfaceObj);
            optionalInterfaceResponse.ifPresent(interfaceResponseList::add);
        });
        return interfaceResponseList;
    }

    @Override
    public void deleteInterfaceById(Long id) {
        if (interfaceRepository.existsById(id)) {
            interfaceRepository.deleteById(id);
        }
    }

    @Override
    public void deleteInterfacesByIds(List<Long> ids) {
        if (!ids.isEmpty()) {
            ids.forEach((id) -> {
                deleteInterfaceById(id);
            });
        }
    }

    @Override
    public Optional<InterfaceResponse> editInterfaceById(Long id, InterfaceRequest interfaceRequest) {
        Optional<Interface> optionalInterface = interfaceRepository.findById(id);
        if (optionalInterface.isPresent()) {
            Interface interfaceToUpdate = optionalInterface.get();

            if ((Integer)interfaceRequest.getIntCode() != null) {
                interfaceToUpdate.setIntCode(interfaceRequest.getIntCode());
            }
            if (interfaceRequest.getIntIden() != null && !interfaceRequest.getIntIden().isEmpty()) {
                interfaceToUpdate.setIntIden(interfaceRequest.getIntIden());
            }
            if (interfaceRequest.getIntLabe() != null && !interfaceRequest.getIntLabe().isEmpty()) {
                interfaceToUpdate.setIntLabe(interfaceRequest.getIntLabe());
            }
            if ((Integer)interfaceRequest.getIntPrimPort() != null) {
                interfaceToUpdate.setIntPrimPort(interfaceRequest.getIntPrimPort());
            }
            if (interfaceRequest.getIntPrimAdre() != null && !interfaceRequest.getIntPrimAdre().isEmpty()) {
                interfaceToUpdate.setIntPrimAdre(interfaceRequest.getIntPrimAdre());
            }
            if ((Integer)interfaceRequest.getStatus() != null) {
                interfaceToUpdate.setStatus(interfaceRequest.getStatus());
            }

            Interface savedInterface = interfaceRepository.save(interfaceToUpdate);
            return InterfaceMapper.convertInterfaceToInterfaceResponse(savedInterface);
        }
        return Optional.empty();
    }


}
