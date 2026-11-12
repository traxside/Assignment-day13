# Hasil Test

| Input/Kondisi | Hasil yang Diharapkan | Hasil Aktual |
| --- | --- | --- |
| Buka `index.html` saat API produk masih memuat data (jaringan lambat) | Halaman menampilkan status pemuatan: breadcrumb "Memuat produk...", judul "Memuat produk...", "Memuat stok", dan "Informasi produk sedang diambil dari katalog." selama data sedang diambil | ![Memuat produk](assignment_test/memuat_produk.jpeg) |
| Buka `index.html` saat API produk di localhost:3000 tidak dapat dihubungi | Halaman menampilkan status gagal memuat: judul "Produk tidak dapat dimuat" dan pesan error "Tidak dapat menghubungi API produk. Coba lagi setelah server siap." | ![Produk gagal dimuat](assignment_test/memuat_produk_gagal.jpeg) |
| `product-1.html` — pilih ukuran M, jumlah 3, harga Rp150.000 | Subtotal = 3 x Rp150.000 = Rp450.000, info ongkir "Gratis ongkir!", ringkasan dan daftar unit sesuai dengan pilihan | ![Subtotal benar (M, 3)](assignment_test/subtotal_benar.jpeg) |
| `product-1.html` — pilih ukuran S, jumlah 2, harga Rp150.000 | Subtotal = 2 x Rp150.000 = Rp300.000, info ongkir "Gratis ongkir!" (tepat mencapai minimum Rp300.000), ringkasan dan daftar unit sesuai dengan pilihan | ![Subtotal benar (S, 2)](assignment_test/subtotal_benar_2.jpeg) |
| Masukkan jumlah 0 (ukuran S terpilih) | Error validasi "Jumlah harus bilangan bulat positif."; ringkasan/subtotal/bar checkout disembunyikan | ![Jumlah 0](assignment_test/input_stok_0.jpeg) |
| Tekan tombol minus (−) saat jumlah sudah 1 (ukuran S terpilih) | Jumlah tetap 1 (tidak bisa turun di bawah 1) dan pesan "Jumlah minimal 1." ditampilkan | ![Jumlah di bawah minimal](assignment_test/input_stok_dikurang.jpeg) |
| Masukkan jumlah 4 saat stok hanya 3 (ukuran S terpilih) | Error validasi "Jumlah melebihi stok (sisa 3)." dan bar checkout disembunyikan | ![Jumlah melebihi stok](assignment_test/input_stok_diluarbatas.jpeg) |
| `product-1.html` — pilih ukuran S (stok 5), jumlah 3, klik "Update Pilihan" | Pesan sukses "3 Kemeja Linen Biru ditambahkan ke tas.", stok S berkurang 5 -> 2 (badge "Sisa 2, segera habis!"), total stok 8 -> 5, counter tas = 3, subtotal Rp450.000 | ![Update berhasil](assignment_test/update_berhasil.jpeg) |
