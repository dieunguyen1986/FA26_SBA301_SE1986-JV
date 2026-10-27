package fu.talenthub.modules.auth.service;

import fu.talenthub.modules.auth.dto.CustomUserDetails;
import fu.talenthub.modules.auth.entity.Role;
import fu.talenthub.modules.auth.entity.User;
import fu.talenthub.modules.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Qualifier("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> optional = userRepository.findByEmail(username);

        User user = optional.orElseThrow(() -> new UsernameNotFoundException("Email/User name not found"));

        log.info("UserDetailsServiceImpl loadUserByUsername = {} - {}", user.getEmail(), user.getId());

        Set<Role> roles = user.getRoles();

        List<GrantedAuthority> grantedAuthorities = roles.stream().map((role -> {
            return new SimpleGrantedAuthority(role.getRoleName());
        })).collect(Collectors.toList());

//        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
//        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_RECRUITER"));

        CustomUserDetails userDetails = new CustomUserDetails(user.getFullName(), user.getPasswordHash(), user.getEmail(), grantedAuthorities);

        return userDetails;
    }
}
