# Assignment-day 13 : Mini Project Full-Stack : Case Study Building Interactivity Website with JavaScript

**Richie Leonardo - BE 19**

Assignment ini dikerjakan dengan melanjutkan hands-on terkait website yang dihasilkan dengan bantuan mentor pada [Hands-On] Modern Front-End Development With AI.

## Perubahan Assignment-Day 13

Beberapa perubahan yang dilakukan oleh untuk memenuhi assignment-day 13 terdapat pada `product-interaction.js`:

1. Membuat function `validateQuantityAndPrice()` untuk memvalidasi input quantity dan harga yang ada. Logic yang terdapat pada function ini sudah ada sebelumnya. Logic ini dipindahkan agar dapat digunakan kembali pada function `renderSummary()`.
2. Membuat function `renderSummary()` yang digunakan untuk membantu memperbarui UI pada footer summary setelah melakukan update variant dan quantity. Logic ini digunakan oleh beberapa event listener seperti `minusButton`, `plusButton`, `variantInput`, `quantityInput`.
3. Menghasilkan interaksi DOM tambahan untuk memperbarui jumlah barang ditambahkan ke dalam tas.
4. Menghasilkan interaksi DOM tambahan untuk memperbarui element dengan id `"stock-summary"` agar jumlah total stok tetap sinkron dengan jumlah di varian.

## Cara Menjalankan

Untuk menjalankan website, dapat menggunakan fitur extension Live Server di aplikasi VS Code pada file `index.html` dan `product-1.html`.

Agar API berjalan, jalankan backend yang terdapat pada folder `api-product`. Cara menjalankan back-end terdapat pada file `README.md` di dalam folder tersebut. Fitur backend API merupakan bawaan dari project [Hands-On] yang diberikan mentor.

Terkait cara pengujian, dapat dilihat pada file `TEST_RESULT.md`.

## Penggunaan AI

Penggunaan AI pada assignment ini adalah untuk membantu merapikan `README.md`, membantu melakukan formatting pada `TEST_RESULT.md` agar berbentuk tabel, membantu dalam memahami struktur program dan melakukan debugging ketika terjadi error pada saat mengerjakan assignment.
