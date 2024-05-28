package org.retaileasy.retaileasyserver.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author tuan
 */

@RestController
@RequestMapping("api/v1/home")
public class HomeController {

	@GetMapping("/all")
	public ResponseEntity<String> index() {
		return new ResponseEntity<String>("sufysuifeh", HttpStatus.OK);
	}
}
