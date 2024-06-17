package org.retaileasy.retaileasyserver.dtos;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.retaileasy.retaileasyserver.models.Feedback;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FeedbackResponse {
    private int status;
    private String message;
    private Feedback data;

}
