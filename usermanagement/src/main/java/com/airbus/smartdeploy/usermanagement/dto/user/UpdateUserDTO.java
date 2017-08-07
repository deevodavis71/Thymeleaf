package com.airbus.smartdeploy.usermanagement.dto.user;

import java.util.List;

import com.airbus.smartdeploy.usermanagement.dto.userrole.UserRoleDTO;

import lombok.Data;

@Data
public class UpdateUserDTO {

	private String firstname;

	private String surname;

	private String password;

	private List<UserRoleDTO> roles;
}
