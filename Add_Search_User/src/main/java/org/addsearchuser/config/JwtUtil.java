package org.addsearchuser.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.util.Date;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    
    public Claims claims;
    
    //Generate token with expire time.
    public String generateToken(String userName) {
        return Jwts.builder()
                .setSubject(userName)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour expiry
                .signWith(secretKey)
                .compact();
    }
    
    //Validate token.
    public boolean validateToken(String token, String userName) {
        String tokenUsername = claims.getSubject();
        return (userName.equals(tokenUsername) && !isTokenExpired());
    }
    
    //Extract userName based on token.
    public String extractUsername(String token) {
    	claims  = getClaims(token);
        return claims.getSubject();
    }

    //Claim token is correct or not.
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    
    //Check token is expired or not.
    private boolean isTokenExpired() {
        return claims.getExpiration().before(new Date());
    }
}

