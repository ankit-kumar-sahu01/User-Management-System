package org.addsearchuser.controller;

import org.addsearchuser.dto.ResponseStructure;
import org.addsearchuser.dto.UsersDTO;
import org.addsearchuser.entity.Users;
import org.addsearchuser.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {

	@Autowired
	private UsersService usersService;
	
	//API for Add User.
	@PostMapping
	public ResponseEntity<ResponseStructure<Users>> addUser(@RequestBody Users user) {
		return usersService.addUser(user);
	}
	
	//API for find user by id.
	@GetMapping("/{id}")
	public ResponseEntity<ResponseStructure<Users>> getUserById(@PathVariable Long id) {
		return usersService.getUserById(id);
	}
	
	//API for search user by userName, firstName, lastName, email.
	@PostMapping("/search")
    public ResponseEntity<List<UsersDTO>> searchUsers(@RequestBody Users searchCriteria) {
        List<Users> usersList = usersService.searchUsers(searchCriteria.getUserName(),
                searchCriteria.getFirstName(), searchCriteria.getLastName(),
                searchCriteria.getEmail());
        List<UsersDTO> usersDTOList = new ArrayList<>();

        for (Users user : usersList) {
            UsersDTO userDTO = new UsersDTO();
            userDTO.setId(user.getId());
            userDTO.setUserName(user.getUserName());
            userDTO.setFirstName(user.getFirstName());
            userDTO.setLastName(user.getLastName());
            userDTO.setEmail(user.getEmail());
            usersDTOList.add(userDTO);
        }

        return ResponseEntity.ok().body(usersDTOList);
    }
}
