package fiap.com.br.gamefinder.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private LocalDate releaseDate;
    private Double rating;

    @ManyToOne
    private Genre genre;

    @ManyToOne
    private Platform platform;

    private String coverUrl;
    private String backdropUrl;
    private boolean inWishlist;

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public LocalDate getReleaseDate() { return releaseDate; }
    public Double getRating() { return rating; }
    public Genre getGenre() { return genre; }
    public Platform getPlatform() { return platform; }
    public String getCoverUrl() { return coverUrl; }
    public String getBackdropUrl() { return backdropUrl; }
    public boolean isInWishlist() { return inWishlist; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setReleaseDate(LocalDate releaseDate) { this.releaseDate = releaseDate; }
    public void setRating(Double rating) { this.rating = rating; }
    public void setGenre(Genre genre) { this.genre = genre; }
    public void setPlatform(Platform platform) { this.platform = platform; }
    public void setCoverUrl(String coverUrl) { this.coverUrl = coverUrl; }
    public void setBackdropUrl(String backdropUrl) { this.backdropUrl = backdropUrl; }
    public void setInWishlist(boolean inWishlist) { this.inWishlist = inWishlist; }
}
