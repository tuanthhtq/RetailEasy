package org.retaileasy.retaileasyserver.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class CommonResponseDto<T> {
    private int status;
    private String message;
    private Map<String, String> error;
    private T data;
    private String additionalData;
}
