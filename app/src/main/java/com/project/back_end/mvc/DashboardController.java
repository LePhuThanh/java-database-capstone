package com.project.back_end.mvc;

import com.project.back_end.service.CommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class DashboardController {

    /**
     * Shared service used for validating JWT tokens.
     */
    private final CommonService commonService;

    /**
     * Admin Dashboard
     *
     * URL:
     * http://localhost:8080/adminDashboard/{token}
     *
     * If token is valid:
     *      -> Render admin/adminDashboard.html
     *
     * Otherwise:
     *      -> Redirect to home page
     */
    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {

        Map<String, Object> validationResult =
                commonService.validateToken(token, "admin");

        if (validationResult.isEmpty()) {
            return "admin/adminDashboard";
        }

        return "redirect:/";
    }

    /**
     * Doctor Dashboard
     *
     * URL:
     * http://localhost:8080/doctorDashboard/{token}
     *
     * If token is valid:
     *      -> Render doctor/doctorDashboard.html
     *
     * Otherwise:
     *      -> Redirect to home page
     */
    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {

        Map<String, Object> validationResult =
                commonService.validateToken(token, "doctor");

        if (validationResult.isEmpty()) {
            return "doctor/doctorDashboard";
        }

        return "redirect:/";
    }

}