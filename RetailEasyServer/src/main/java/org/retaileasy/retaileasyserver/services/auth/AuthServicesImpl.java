package org.retaileasy.retaileasyserver.services.auth;

import org.retaileasy.retaileasyserver.configuration.implement.UserDetailsServiceImpl;
import org.retaileasy.retaileasyserver.dtos.auth.*;
import org.retaileasy.retaileasyserver.models.StoreInformation;
import org.retaileasy.retaileasyserver.models.User;
import org.retaileasy.retaileasyserver.models.UserRole;
import org.retaileasy.retaileasyserver.repository.RoleRepository;
import org.retaileasy.retaileasyserver.repository.StoreInformationRepository;
import org.retaileasy.retaileasyserver.repository.UserRepository;
import org.retaileasy.retaileasyserver.repository.UserRoleRepository;
import org.retaileasy.retaileasyserver.utils.DtoMapper;
import org.retaileasy.retaileasyserver.utils.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @author tuan
 */

@Service
public class AuthServicesImpl implements AuthServices {

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final StoreInformationRepository storeInformationRepository;

    @Autowired
    public AuthServicesImpl(
            UserRepository ur,
            UserRoleRepository urr, RoleRepository roleRepository,
            PasswordEncoder encoder,
            JwtHelper jwtHelper, AuthenticationManager authManager, UserDetailsServiceImpl userDetailsServiceImpl, StoreInformationRepository storeInformationRepository){
        this.userRepository = ur;
        this.roleRepository = roleRepository;
        this.passwordEncoder = encoder;
        this.userRoleRepository = urr;
        this.authManager = authManager;
        this.userDetailsService = userDetailsServiceImpl;
        this.storeInformationRepository = storeInformationRepository;
    }


    @Override
    public CreateAdminResponseDto createAdminAccount(CreateAdminRequestDto request) {
        long userNum = userRepository.count();
        if(userNum > 0){
            return new CreateAdminResponseDto(403, "Forbidden!");
        }

        User user = new User(
                request.getIdNumber(),
                request.getUsername(),
                passwordEncoder.encode(request.getPassword()),
                request.getFullName(),
                request.getPhone(),
                request.getAddress(),
                request.getEmail()
        );

        StoreInformation store = new StoreInformation(
                request.getStoreName(),
                request.getAddress(),
                request.getPhone(),
                request.getEmail()
        );

        try{
            //add store information
            storeInformationRepository.saveAndFlush(store);
            //add user
            userRepository.saveAndFlush(user);

            //add roles
            Set<UserRole> roles = new HashSet<>();
            List<String> list = new ArrayList<>();
            list.add("ROLE_ADMIN");
            list.add("ROLE_CASHIER");
            list.add("ROLE_DATA_ENTRY");
            for(String roleName: list){
                UserRole role = new UserRole(user, roleRepository.findByRoleName(roleName));
                roles.add(role);
                userRoleRepository.saveAndFlush(role);
            }
            user.setUserRoles(roles);
            userRepository.saveAndFlush(user);
            return new CreateAdminResponseDto(HttpStatus.CREATED.value(), DtoMapper.toUserDataDto(user, ""),  "Account created", request.getStoreName());
        }catch (Exception e){
            return new CreateAdminResponseDto(400, e.getLocalizedMessage());
        }
    }

    @Override
    public AuthResponseDto authenticate(LoginRequestDto request) {
        User user = userRepository.findByUsernameOrPhoneNumber(request.getUsernameOrPhone(), request.getUsernameOrPhone())
                .orElse(null);

        if(user == null){
            return new AuthResponseDto(401, "Username or phone number does not exist!");
        }else{
            if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
                return new AuthResponseDto(401, "Password is incorrect!");
            }
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        //login success
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsernameOrPhone(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = JwtHelper.create(userDetails);

        return new AuthResponseDto(200, DtoMapper.toUserDataDto(user, accessToken), "Login success!");
    }

    @Override
    public AuthResponseDto createAccount(CreateAccountRequestDto request) {
        User user = userRepository.findByPhoneNumber(request.getPhone())
                .orElse(null);
        if(user != null){
            return new AuthResponseDto(400, "This phone number is in use!");
        }

        user = userRepository.findByUsername(request.getUsername())
                .orElse(null);
        if(user != null){
            return new AuthResponseDto(400, "This username is in use!");
        }

        user = userRepository.findByIdNumber(request.getIdNumber())
                .orElse(null);
        if(user != null){
            return new AuthResponseDto(400, "This id number is already exists!");
        }

        //username, phone and id number are available
        user = new User(
                request.getIdNumber(),
                request.getUsername(),
                passwordEncoder.encode(request.getIdNumber()),
                request.getFullName(),
                request.getPhone(),
                request.getAddress(),
                request.getEmail()
        );

        try{
            userRepository.saveAndFlush(user);

            Set<UserRole> roles = new HashSet<>();
            for(String roleName: request.getRoles()){
                UserRole role = new UserRole(user, roleRepository.findByRoleName(roleName));
                roles.add(role);
                userRoleRepository.saveAndFlush(role);
            }
            user.setUserRoles(roles);
            userRepository.saveAndFlush(user);
            return new AuthResponseDto(201, DtoMapper.toUserDataDto(user, ""),  "Account created");
        }catch (Exception e){
            return new AuthResponseDto(400, e.getLocalizedMessage());
        }
    }


}
