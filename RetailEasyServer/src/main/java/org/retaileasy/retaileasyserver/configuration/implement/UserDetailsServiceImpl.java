package org.retaileasy.retaileasyserver.configuration.implement;

import org.retaileasy.retaileasyserver.models.User;
import org.retaileasy.retaileasyserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author tuan
 */

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	private final UserRepository userRepository;

	@Autowired
	public UserDetailsServiceImpl(UserRepository ur) {
		this.userRepository = ur;
	}

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
		User user = userRepository.findByPhoneNumber(phone).orElse(null);

		return user == null ? null : new UserDetailsImpl().build(user);
	}
}
