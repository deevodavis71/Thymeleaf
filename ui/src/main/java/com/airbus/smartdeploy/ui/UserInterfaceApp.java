package com.airbus.smartdeploy.ui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class UserInterfaceApp {
	public static void main(String[] args) {
		SpringApplication.run(UserInterfaceApp.class, args);
	}
}
