package org.retaileasy.retaileasyserver.services.auth;

import org.retaileasy.retaileasyserver.configuration.implement.UserDetailsServiceImpl;
import org.retaileasy.retaileasyserver.dtos.CommonResponseDto;
import org.retaileasy.retaileasyserver.dtos.UserDataDto;
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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

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
            JwtHelper jwtHelper,
            AuthenticationManager authManager,
            UserDetailsServiceImpl userDetailsServiceImpl,
            StoreInformationRepository storeInformationRepository
    ){
        this.userRepository = ur;
        this.roleRepository = roleRepository;
        this.passwordEncoder = encoder;
        this.userRoleRepository = urr;
        this.authManager = authManager;
        this.userDetailsService = userDetailsServiceImpl;
        this.storeInformationRepository = storeInformationRepository;
    }


    @Override
    public CommonResponseDto<UserDataDto> createAdminAccount(CreateAdminRequestDto request, BindingResult bindingResult) {
        //init response
        CommonResponseDto<UserDataDto> response = new CommonResponseDto<>();
        response.setStatus(400);
        response.setMessage("Khởi tạo admin thất bại");

        Map<String, String> errors = new HashMap<>();

        //fields errors
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            response.setError(errors);
            return response;
        }

        long userNum = userRepository.count();
        if(userNum > 0){
            response.setStatus(403);
            response.setMessage("Forbidden!");
            return response;
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
                request.getFullName(),
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

            response.setData(DtoMapper.toUserDataDto(user, ""));
            response.setStatus(201);
            response.setMessage("Khởi tạo admin thành công");
            response.setAdditionalData(request.getStoreName());

            return response;
        }catch (Exception e){
            errors.put("error", e.getLocalizedMessage());
            response.setMessage(e.getLocalizedMessage());
            response.setError(errors);
            return response;
        }
    }

    @Override
    public CommonResponseDto<UserDataDto> authenticate(LoginRequestDto request, BindingResult bindingResult) {

        CommonResponseDto<UserDataDto> response = new CommonResponseDto<>();
        response.setMessage("Đăng nhập thất bại");
        response.setStatus(401);
        Map<String, String> errors = new HashMap<>();

        //fields errors
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            response.setError(errors);
            return response;
        }

        User user = userRepository.findByPhoneNumber(request.getPhone())
                .orElse(null);

        if(user == null){
            errors.put("phone", "Số điện thoại không tồn tại");
        }else{
            if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
                errors.put("password", "Mật khẩu không đúng");
                return response;
            }
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getPhoneNumber());
            //login success
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getPhone(), request.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String accessToken = JwtHelper.create(userDetails);

            response.setStatus(200);
            response.setMessage("Đăng nhập thành công");
            response.setData(DtoMapper.toUserDataDto(user, accessToken));

        }
        return response;
    }

    @Override
    public CommonResponseDto<UserDataDto> createAccount(CreateAccountRequestDto request, BindingResult bindingResult) {
        CommonResponseDto<UserDataDto> response = new CommonResponseDto<>();
        response.setMessage("Tạo tài khoản thất bại");
        response.setStatus(400);

        Map<String, String> errors = new HashMap<>();
        //fields errors
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            response.setError(errors);
            return response;
        }
        User user = userRepository.findByPhoneNumber(request.getPhone()).orElse(null);
        if(user != null){
            errors.put("phone", "Số điện thoại này đã được dùng");
        }
        user = userRepository.findByUsername(request.getUsername()).orElse(null);
        if(user != null){
            errors.put("username", "Tên đăng nhập đã được dùng");
        }
        user = userRepository.findByIdNumber(request.getIdNumber()).orElse(null);
        if(user != null){
            errors.put("id", "Số CCCD đã được đăng ký");
        }

        if(!errors.isEmpty()){
            return response;
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

            response.setStatus(201);
            response.setData(DtoMapper.toUserDataDto(user, ""));
            response.setMessage("Tài khoản tạo thành công");

            return response;
        }catch (Exception e){
            errors.put("error", e.getLocalizedMessage());
            response.setMessage(e.getLocalizedMessage());
            response.setError(errors);
            return response;
        }
    }


}
