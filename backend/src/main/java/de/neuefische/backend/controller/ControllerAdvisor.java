package de.neuefische.backend.controller;

import de.neuefische.backend.exceptions.UsernameAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerAdvisor {
    @ExceptionHandler(UsernameAlreadyExistsException.class)
    private ResponseEntity<Object> handleUsernameAlreadyExistsException(UsernameAlreadyExistsException exception){
        return new ResponseEntity<Object>(exception.getMessage(), HttpStatus.CONFLICT);
    }

}
