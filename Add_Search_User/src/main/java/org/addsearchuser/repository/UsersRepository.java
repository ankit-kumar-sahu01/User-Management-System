package org.addsearchuser.repository;

import org.addsearchuser.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
	//Custom method
    Optional<Users> findByUserName(String userName);

    List<Users> findByEmail(String email);
}

