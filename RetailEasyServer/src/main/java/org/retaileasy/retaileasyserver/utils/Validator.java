package org.retaileasy.retaileasyserver.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validator {

    public static boolean checkEmail(String email){
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public static boolean checkPhone(String phone){
        String phoneRegex = "^0[1-9]\\d{9,}$";
        Pattern pattern = Pattern.compile(phoneRegex);
        Matcher matcher = pattern.matcher(phone);
        return matcher.matches();
    }

    public static boolean checkName(String fullName){
        String fullNameRegex = "^[A-Za-z]+(?:\\s[A-Za-z]+)+$";
        Pattern pattern = Pattern.compile(fullNameRegex);
        Matcher matcher = pattern.matcher(fullName);
        return matcher.matches();
    }

}
