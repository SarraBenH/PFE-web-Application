package com.pfe.projet.mappers;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.pfe.projet.dtos.requests.InterfaceRequest;
import com.pfe.projet.dtos.responses.InterfaceResponse;
import com.pfe.projet.models.Interface;
@Component
public class InterfaceMapper {

    public static Optional<Interface> convertInterfaceRequestToInterface(InterfaceRequest interfaceRequest) {
        if (interfaceRequest == null) {
            return Optional.empty();
        }

        Interface interfaceObj = new Interface();
        interfaceObj.setIntCode(interfaceRequest.getIntCode());
        interfaceObj.setIntIden(interfaceRequest.getIntIden());
        interfaceObj.setIntLabe(interfaceRequest.getIntLabe());
        interfaceObj.setIntPrimPort(interfaceRequest.getIntPrimPort());
        interfaceObj.setIntPrimAdre(interfaceRequest.getIntPrimAdre());
        interfaceObj.setStatus(interfaceRequest.getStatus());

        return Optional.of(interfaceObj);
    }

    public static Optional<InterfaceResponse> convertInterfaceToInterfaceResponse(Interface interfaceObj) {

        if (interfaceObj == null) {
            return Optional.empty();
        }

        InterfaceResponse interfaceResponse = new InterfaceResponse();
        interfaceResponse.setId(interfaceObj.getId());
        interfaceResponse.setIntCode(interfaceObj.getIntCode());
        interfaceResponse.setIntIden(interfaceObj.getIntIden());
        interfaceResponse.setIntLabe(interfaceObj.getIntLabe());
        interfaceResponse.setIntPrimPort(interfaceObj.getIntPrimPort());
        interfaceResponse.setIntPrimAdre(interfaceObj.getIntPrimAdre());
        interfaceResponse.setStatus(interfaceObj.getStatus());

        return Optional.of(interfaceResponse);
    }
}
