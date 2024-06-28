package org.retaileasy.retaileasyserver.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "import_items")
public class ImportItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rel_id", nullable = false)
    private Integer id;

    @Size(max = 150)
    @NotNull
    @Column(name = "product_name", nullable = false, length = 150)
    private String productName;

    @Size(max = 255)
    @Column(name = "product_image")
    private String productImage;

    @NotNull
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @Column(name = "manufactured_date")
    private Instant manufacturedDate;

    @Column(name = "expiry")
    private Instant expiry;

    @ColumnDefault("b'0'")
    @Column(name = "is_return")
    private Boolean isReturn;

    @Column(name = "price")
    private Integer price;

}
