package com.airbus.smartdeploy.usermanagement.dto.user;

import java.util.List;

import com.airbus.smartdeploy.usermanagement.dto.userrole.UserRoleDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
public class CreateUserDTO {

	private String username;

	private String password;

	private String firstname;

	private String surname;

	private List<UserRoleDTO> roles;

}
