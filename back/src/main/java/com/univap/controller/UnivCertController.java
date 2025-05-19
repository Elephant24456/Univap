package com.univap.controller;

import com.univap.dto.UnivCertRequest;
import com.univap.dto.UnivCertVerify;
import com.univap.service.UnivCertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/univ")
@CrossOrigin(origins = "http://localhost:3000")  // 프론트에서 요청 허용
public class UnivCertController {

    @Autowired
    private UnivCertService univCertService;

    @PostMapping("/request")
    public ResponseEntity<String> requestEmailCert(@RequestBody UnivCertRequest request) {
        return univCertService.requestCert(request);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyEmailCert(@RequestBody UnivCertVerify dto) {
        return univCertService.verifyCode(dto);
    }
}
