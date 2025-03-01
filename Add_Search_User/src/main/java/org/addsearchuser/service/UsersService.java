package org.addsearchuser.service;

import org.addsearchuser.dto.ResponseStructure;
import org.addsearchuser.entity.Users;
import org.addsearchuser.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public ResponseEntity<ResponseStructure<Users>> addUser(Users user) {
		// Check if userName already exists
		if (usersRepository.findByUserName(user.getUserName()).isPresent()) {
			ResponseStructure<Users> response = new ResponseStructure<>();
			response.setStatus("Username already exists.");
			response.setUserId(null); // No userId since the user was not created
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		// Encrypt the password before saving
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		// Save the user
		Users savedUser = usersRepository.save(user);

		// Prepare the response
		ResponseStructure<Users> response = new ResponseStructure<>();
		response.setStatus("User Added Successfully.");
		response.setUserId(savedUser.getId().intValue()); // Convert Long to Integer

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	// Find by id method
	public ResponseEntity<ResponseStructure<Users>> getUserById(Long id) {
		Optional<Users> users = usersRepository.findById(id);

		ResponseStructure<Users> response = new ResponseStructure<>();
		if (users.isPresent()) {
			response.setStatus("User found");
			response.setUserId(users.get().getId().intValue());
			response.setData(users.get());
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			response.setStatus("User not found");
			response.setUserId(null);
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
	}

	// Filter user by their userName, firstName, lastName and email.
	public List<Users> searchUsers(String userName, String firstName, String lastName, String email) {
		return usersRepository.findAll().stream()
				.filter(user -> (userName == null || user.getUserName().equals(userName))
						&& (firstName == null || user.getFirstName().equals(firstName))
						&& (lastName == null || user.getLastName().equals(lastName))
						&& (email == null || user.getEmail().equals(email)))
				.toList();
	}

}
