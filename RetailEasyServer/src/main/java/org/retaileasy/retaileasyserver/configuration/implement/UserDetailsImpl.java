package org.retaileasy.retaileasyserver.configuration.implement;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.retaileasy.retaileasyserver.models.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author tuan
 */

@Getter
@Setter
public class UserDetailsImpl implements UserDetails {

	@Getter
	private Integer id;

	private String username;

	@Getter
	private String phone;

	@JsonIgnore
	private String password;
	private Collection<? extends GrantedAuthority> authorities;

	public UserDetailsImpl(Integer id, String phone, String password,
						   Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.username = phone;
		this.phone = phone;
		this.password = password;
		this.authorities = authorities;
	}

	public UserDetailsImpl() {

	}

	@Transactional
	public UserDetailsImpl build(User user) {
		List<GrantedAuthority> authorities = user.getUserRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getRole().getRoleName()))
				.collect(Collectors.toList());

		return new UserDetailsImpl(
				user.getId(),
				user.getPhoneNumber(),
				user.getPassword(),
				authorities);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
