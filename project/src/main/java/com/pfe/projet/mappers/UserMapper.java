package com.pfe.projet.mappers;

import com.pfe.projet.dtos.requests.UserRequest;
import com.pfe.projet.dtos.responses.UserResponse;
import com.pfe.projet.models.User;
import org.springframework.util.CollectionUtils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

public class UserMapper {
    /*
    * le workflow est j'appuie sur bouton j'envoie un UserRequest(celui de la ui) je le stock en userObject (celui
    * de la DB et je renvoie un UserResponse(la reponse donnée à la UI)
    *
    * UserRequest =====> UserObject =====> UserResponse
    *
    * */
    public static Optional<List<UserResponse>> convertUserObjectsToUserResponses(List<User> users){

        if (CollectionUtils.isEmpty(users)){
            return Optional.empty();
        }
        List<UserResponse> userResponses = new ArrayList<>() ;
        users.forEach(user -> {
            Optional<UserResponse> optionalUser = convertUserObjectToUserResponse(user);
            optionalUser.ifPresent(userResponses::add);
        });

        return Optional.of(userResponses);
    }


    public static Optional<UserResponse> convertUserObjectToUserResponse(User user){
        if (Objects.isNull(user)){
            return Optional.empty();
        }

        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setSessionId(user.getSessionId());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setEmail(user.getEmail());
        userResponse.setCity(user.getCity());
        userResponse.setPhoneNumber(user.getPhoneNumber());
        userResponse.setImage(user.getImage());
        userResponse.setPosition(user.getPosition());
        userResponse.setAlert_ids(user.getAlert_ids());



        
        return Optional.of(userResponse);
    }

    public static Optional<User> convertUserRequestToUserObject(UserRequest userRequest){
        if (Objects.isNull(userRequest)){
            return Optional.empty();
        }
        User user = new User();
        user.setSessionId(userRequest.getSessionId());
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setEmail(userRequest.getEmail());
        user.setCity(userRequest.getCity());
        user.setPhoneNumber(userRequest.getPhoneNumber());
        user.setPosition(userRequest.getPosition());
        user.setImage(userRequest.getImage());
        user.setPassword(hashPassword(userRequest.getPassword()));
        user.setAlert_ids(userRequest.getAlert_ids());
        return Optional.of(user);
    }
    
    public static String hashPassword(String password) {
        try {
            // Obtenir une instance de l'algorithme de hachage SHA-256
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");

            // Hacher le mot de passe
            byte[] hash = messageDigest.digest(password.getBytes());

            // Convertir le hachage en une chaîne hexadécimale
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
             hexString.append(String.format("%02x", b));
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public static String encodeImage(byte[] image) {
    	return Base64.getEncoder().encodeToString(image) ;
    }
    
    public static byte[] decodeImage(String image) {
     return image.getBytes(StandardCharsets.UTF_8);
		}
}
