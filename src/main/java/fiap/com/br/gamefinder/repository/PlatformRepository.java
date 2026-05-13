package fiap.com.br.gamefinder.repository;

import fiap.com.br.gamefinder.model.Platform;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlatformRepository extends JpaRepository<Platform, Long> {
}
