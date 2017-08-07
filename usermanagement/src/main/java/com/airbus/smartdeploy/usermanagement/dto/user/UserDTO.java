package com.airbus.smartdeploy.usermanagement.dto.user;

import java.util.List;

import com.airbus.smartdeploy.usermanagement.dto.userrole.UserRoleDTO;

import lombok.Data;

@Data
public class UserDTO {

	private String id;

	private String username;

	// TODO : Remove from the outbound DTOs, as we really don't want to share
	// the encrypted password with the outside world!!
	private String password;

	private String firstname;

	private String surname;

	private List<UserRoleDTO> roles;

}
