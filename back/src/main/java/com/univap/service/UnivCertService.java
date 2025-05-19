package com.univap.service;

import com.univap.dto.UnivCertRequest;
import com.univap.dto.UnivCertVerify;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class UnivCertService {

    private final String apiKey = "3e6bca2a-127c-45e7-ac0a-5e0cd4e1eb06";

    public ResponseEntity<String> requestCert(UnivCertRequest dto) {
        try {
            String url = "https://univcert.com/api/v1/certify";

            Map<String, Object> request = Map.of(
                    "key", apiKey,
                    "email", dto.getEmail(),
                    "univName", dto.getUnivName(),
                    "univ_check", true
            );

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            System.out.println("요청 응답: " + response.getBody());

            return ResponseEntity.status(response.getStatusCode()).body("인증 메일이 전송되었습니다.");
        } catch (HttpClientErrorException e) {
            // JSON 응답 파싱
            String responseBody = e.getResponseBodyAsString();
            System.out.println("에러 응답 바디: " + responseBody);

            if (responseBody.contains("이미 완료된 요청입니다")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 가입된 이메일입니다.");
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("인증 요청 실패: " + responseBody);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("인증 요청 실패: " + e.getMessage());
        }
    }

    public ResponseEntity<String> verifyCode(UnivCertVerify dto) {
        try {
            String url = "https://univcert.com/api/v1/certifycode";

            Map<String, Object> request = Map.of(
                    "key", apiKey,
                    "email", dto.getEmail(),
                    "univName", dto.getUnivName(),
                    "code", dto.getCode()
            );

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            Map body = response.getBody();
            System.out.println("검증 응답: " + body);

            if (body != null && Boolean.TRUE.equals(body.get("success"))) {
                return ResponseEntity.ok("이메일 인증 성공");
            } else {
                return ResponseEntity.status(400).body("인증 실패: " + body.get("message"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("인증 확인 실패: " + e.getMessage());
        }
    }
}
