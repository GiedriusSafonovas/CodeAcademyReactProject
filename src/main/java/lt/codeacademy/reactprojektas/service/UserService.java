package lt.codeacademy.reactprojektas.service;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.reactprojektas.Repository.AuthorityRepository;
import lt.codeacademy.reactprojektas.Repository.PlaylistRepository;
import lt.codeacademy.reactprojektas.Repository.UserRepository;
import lt.codeacademy.reactprojektas.dto.UserDto;
import lt.codeacademy.reactprojektas.model.Authority;
import lt.codeacademy.reactprojektas.model.Playlist;
import lt.codeacademy.reactprojektas.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final PlaylistRepository playlistRepository;


    public void registerNewUser(UserDto userDto) {

        Set<Authority> authorities = authorityRepository.findAll().stream().filter(auth -> auth.getName().equals("USER")).collect(Collectors.toUnmodifiableSet());

//        Authority authority = Authority.builder().name("USER").build();
//
//        authorityRepository.save(authority);

        Playlist playlist = createNewLikedSongPlaylist();

        if (userRepository.findUsersByUsernameWithAuthorities(userDto.getUserName()).isPresent()) {
            throw new RuntimeException();
        }
        User newUser = User.builder()
                .Username(userDto.getUserName())
                .Password(PasswordEncoderFactories.createDelegatingPasswordEncoder().encode(userDto.getPassword()))
                .authorities(authorities)
                .playlists(Set.of(playlist))
                .build();

        userRepository.save(newUser);
    }

    private Playlist createNewLikedSongPlaylist() {
        Playlist playlist = Playlist.builder().name("Liked Songs").build();
        playlistRepository.save(playlist);
        return playlist;
    }

    public User getUserByName(String userName) {
        return userRepository.findById(userName).orElseThrow();
    }

    public Optional<User> getUserByNameOptional(String userName) {
        return userRepository.findById(userName);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUsersByUsernameWithAuthorities(username).orElseThrow();
    }
}
