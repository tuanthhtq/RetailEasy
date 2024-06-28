package org.retaileasy.retaileasyserver.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "imports")
public class Import {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "import_id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @NotNull
    @Column(name = "import_price", nullable = false)
    private Integer importPrice;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "return_price", nullable = false)
    private Integer returnPrice;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @CreationTimestamp(source = SourceType.DB)
    @Column(name = "created_date")
    private Instant createdDate;

}
