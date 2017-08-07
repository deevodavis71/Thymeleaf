package com.airbus.smartdeploy.ui.web;


import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

import com.airbus.smartdeploy.usermanagement.dto.user.UserDTO;

@Slf4j
@Controller
public class UserInterfaceController {

	@RequestMapping("/")
	public String goHome(Model model) {

		// Execute the service
		RestTemplate restTemplate = new RestTemplate();
        UserDTO[] users = restTemplate.getForObject("http://localhost:10000/api/users", UserDTO[].class);

        List<UserDTO> lstUsers = Arrays.asList(users);      
        log.info ("User: {}", lstUsers);

		model.addAttribute("users", lstUsers);
		
		return "index";
	}

	@RequestMapping("/plan")
	public String plan() {
		return "plan";
	}

	@RequestMapping("/order")
	public String order() {
		return "order";
	}

	@RequestMapping("/project")
	public String project() {
		return "project";
	}

	@RequestMapping("/logs")
	public String logs() {
		return "logs";
	}

}
