# Assignment-day 13 : Mini Project Full-Stack : Case Study Building Interactivity Website with JavaScript

**Richie Leonardo - BE 19**

Assignment ini dikerjakan dengan melanjutkan hands-on terkait website yang dihasilkan dengan bantuan mentor pada [Hands-On] Modern Front-End Development With AI.

### Catatan terkait index.html yang menggunakan API dari `script.js`
Gambar produk pada index.html memang tidak termuat dikarenakan API response hanya memberikan url image dummy. API berasal dari [Hands-On] mentor pada day sebelumnya.

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

## Halaman, Endpoint Baseline, dan Penanganan Error

### Halaman Hardcoded dan API-driven

| Halaman | Sumber data | Keterangan |
| --- | --- | --- |
| `project-AI/product-1.html` | Hardcode di HTML/JS | Kemeja Linen Biru — Rp150.000, stok per ukuran (S: 5, M: 3, L: 0) |
| `project-AI/index.html` | API driven (`script.js`) | Nama, harga, gambar, deskripsi, pilihan variasi, dan stok dirender dari response endpoint |

Halaman hardcoded menampilkan data langsung dari HTML/JS, sedangkan halaman API hanya merender data setelah response berhasil. Kedua halaman memakai `product-interaction.js` untuk interaksi DOM: pemilihan varian dan jumlah (termasuk stepper −/+), validasi bilangan bulat positif dan batas stok, ringkasan + subtotal, badge stok, info gratis ongkir, daftar unit, pesan validasi/sukses, pembaruan cart count lokal, serta feedback pada tombol aksi.

### Endpoint Baseline yang Digunakan

- `GET http://localhost:3000/api/products/:id` — mengembalikan detail satu produk. Endpoint ini merupakan baseline dari sesi hands-on; tidak ada endpoint baru yang ditambahkan.
- Bentuk response: `{ "data": { "id", "name", "price", "image", "images", "variants": { "colorOrSize": [...], "quantity" }, "description" }, "meta" }`.
- Mapping response di `script.js`: `payload.data` menjadi sumber render; `price` mengisi `data-price`, dan `variants.quantity` (total stok) mengisi `data-stock` untuk `product-interaction.js`.
- Tidak ada API key atau credential yang disimpan di frontend maupun di repository.

### Cara Error Ditangani pada Halaman API

- **Loading state**: selama request berjalan, halaman menampilkan "Memuat produk…", "Memuat stok", dan "Informasi produk sedang diambil dari katalog."
- **Pemeriksaan response**: `response.ok` diperiksa sebelum `response.json()` dibaca; response yang bukan JSON atau payload kosong dianggap gagal.
- **Error state**: kegagalan jaringan atau HTTP ditangkap dengan `try/catch` lalu ditampilkan lewat `showError()` (pesan status error, judul "Produk tidak dapat dimuat", dan petunjuk menjalankan server API). ID tidak valid dan status 404 memakai pesan khusus ("ID produk tidak valid." / "Produk tidak ditemukan."). Karena indikator loading berupa teks status yang selalu ditimpa, loading indicator tidak tertinggal saat terjadi error.
- **Tanpa duplikasi**: `loadProduct()` hanya dipanggil sekali saat halaman dimuat dan seluruh event listener dipasang satu kali, sehingga request maupun listener tidak terduplikasi.

Folder `api-product/` adalah backend baseline dari sesi hands-on mentor, dan `project-AI/frontend/` merupakan eksperimen front-end tambahan; keduanya bukan website atau backend baru yang menggantikan kedua halaman website.
