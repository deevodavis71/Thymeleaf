package com.airbus.smartdeploy.usermanagement.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.airbus.smartdeploy.usermanagement.dto.user.CreateUserDTO;
import com.airbus.smartdeploy.usermanagement.dto.user.UpdateUserDTO;
import com.airbus.smartdeploy.usermanagement.dto.user.UserDTO;
import com.airbus.smartdeploy.usermanagement.dto.userrole.UserRoleDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class UserController {

	@GetMapping("/users/{id}")
	public ResponseEntity<UserDTO> getUser(@PathVariable(value = "id") String id) {

		log.info("Getting user details for Id : {}", id);

		// Hack for now
		UserDTO dto = new UserDTO ();
        dto.setUsername ("johndoe");

		// Convert the user and return
		return new ResponseEntity<UserDTO>(dto, HttpStatus.OK);
	}

	@PostMapping("/users/create")
	public ResponseEntity<UserDTO> createUser(@RequestBody CreateUserDTO dto) {

		log.info("Creating user : {}", dto.getUsername());

		// Hack for now
		UserDTO newUser = new UserDTO ();
        newUser.setUsername (dto.getUsername ());

		// Convert the user and return
		return new ResponseEntity<UserDTO>(newUser, HttpStatus.CREATED);
	}

	@PutMapping("/users/{id}")
	public ResponseEntity<UserDTO> updateUser(@PathVariable(value = "id") String id, @RequestBody UpdateUserDTO dto) {

		log.info("Updating user Id : {}", id);

		// Hack for now
		UserDTO userDto = new UserDTO ();
        userDto.setUsername ("johndoe");

		// Convert the user and return
		return new ResponseEntity<UserDTO>(userDto, HttpStatus.OK);
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<UserDTO> deleteUser(@PathVariable(value = "id") String id) {

		log.info("Deleting user Id : {}", id);

		// Convert the user and return
		return new ResponseEntity<UserDTO>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/users")
	public ResponseEntity<List<UserDTO>> listUsers() {

		// If no users
		List<UserDTO> dtos = new ArrayList<>();

        // Add them
        for (int i = 0; i < 5; i++) {

            UserDTO newUser = new UserDTO ();
            newUser.setUsername ("johndoe-" + i);

            dtos.add(newUser);
        }

		// return the list
		return new ResponseEntity<List<UserDTO>>(dtos, HttpStatus.OK);
	}
}
