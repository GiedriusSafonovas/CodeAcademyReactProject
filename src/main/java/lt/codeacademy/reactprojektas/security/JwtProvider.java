package lt.codeacademy.reactprojektas.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lt.codeacademy.reactprojektas.model.Authority;
import lt.codeacademy.reactprojektas.model.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtProvider {

    private final long tokenValidityInMillis = 30 * 60 * 1000;

    private SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS512;

    private SecretKey secretKey;

    @PostConstruct
    protected void init(){
        secretKey = Keys.secretKeyFor(signatureAlgorithm);
    }

    public String getToken(User principal) {
        final Date now = new Date();

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setIssuer("song-api")
                .setAudience("song-ui")
                .setSubject(principal.getUsername())
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidityInMillis))
                .claim("roles", principal.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet()))
                .signWith(secretKey)
                .compact();
    }

    public Authentication parseToken(String token) {
        Claims parsedJwtBody = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        String username = parsedJwtBody.getSubject();
        List<GrantedAuthority> authorities = ((List<String>) parsedJwtBody.get("roles")).stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return new UsernamePasswordAuthenticationToken(username, null, authorities);
    }

    public Long getExpiresInSeconds(){
        return tokenValidityInMillis / 1000;
    }
}
