package com.airbus.smartdeploy.ui.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserInterfaceController {

	@RequestMapping("/")
	public String goHome() {
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
