package org.retaileasy.retaileasyserver.controllers;

import org.retaileasy.retaileasyserver.models.StoreInformation;
import org.retaileasy.retaileasyserver.repository.StoreInformationRepository;
import org.retaileasy.retaileasyserver.services.anonymous.AnonymousServices;
import org.springframework.beans.factory.annotation.Autowired;
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

	private final AnonymousServices anonymousServices;

	@Autowired
	public HomeController (
			AnonymousServices anonymousServices
    ){
        this.anonymousServices = anonymousServices;
	}

	@GetMapping("/landing")
	public ResponseEntity<StoreInformation> index() {
		return new ResponseEntity<>(anonymousServices.getStoreInfo(), HttpStatus.OK);
	}


}
