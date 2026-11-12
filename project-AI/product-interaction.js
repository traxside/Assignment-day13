// Day 16 · product-interaction.js (shared by product detail 1, 2 and 3)
// Day 15: Number(), subtotal, checkout bar.
// Day 16: switch (stock per variant), if / else if / else (stock badge, stepper, validation,
// free shipping) and for (unit list in the checkout bar).
const form = document.querySelector('#productForm');
const priceElement = document.querySelector('#productPrice');
const variantInput = document.querySelector('#variant');
const quantityInput = document.querySelector('#quantity');
const variantLabel = document.querySelector('label[for="variant"]').textContent; // "Ukuran" / "Warna" / "Varian"
const summary = document.querySelector('#selectionSummary');
const subtotalText = document.querySelector('#subtotalText');
const checkoutBar = document.querySelector('#checkoutBar');
const checkoutButton = document.querySelector('#checkoutButton');
const checkoutToast = document.querySelector('#toast');
// Day 16 elements
const stockBadge = document.querySelector('#stockBadge');
const formMessage = document.querySelector('#formMessage');
const minusButton = document.querySelector('#quantityMinus');
const plusButton = document.querySelector('#quantityPlus');
const unitList = document.querySelector('#unitList');
const shippingInfo = document.querySelector('#shippingInfo');
const FREE_SHIPPING_MIN = 300000;

// Mendapatkan stock summary (Interaksi DOM tambahan ke-1)
const stockSummary = document.querySelector('#stock-summary');

// Untuk menyimpan data tas (Interaksi DOM tambahan ke-2)
const bagCountElement = document.querySelector('#bag-count');
const bagButtonElement = document.querySelector('.bag-button');
let bagItemCount = Number(bagCountElement.textContent) || 0;

const stockByVariant = { S: 5, M: 3, L: 0, Putih: 6, Hitam: 2, Krem: 0 };

function getStock(variant) {
  // Product 2 (API): the API has ONE total stock, script.js puts it in form.dataset.stock
  if (form.dataset.stock !== undefined) {
    return Number(form.dataset.stock);
  }
  return variant in stockByVariant ? stockByVariant[variant] : -1; // -1 = variant tidak diketahui
}

function setStock(variant, stock) {
  // Product 2 (API): the API has ONE total stock, script.js puts it in form.dataset.stock
  if (form.dataset.stock !== undefined) {
    form.dataset.stock = stock;
  } else if (variant in stockByVariant) {
    stockByVariant[variant] = stock;
  }
}

function totalStock() {
  if (form.dataset.stock !== undefined) {
    return Number(form.dataset.stock);
  }
  let total = 0;
  for (const option of variantInput.options) {
    if (option.value === '') {
      continue;
    }
    const stock = getStock(option.value);
    if (stock > 0) {
      total += stock;
    }
  }
  return total;
}

function updateStockSummary() {
  const total = totalStock();
  stockSummary.textContent = total > 0 ? total + ' tersedia' : 'Stok habis';
}

function showMessage(text) {
  formMessage.textContent = text;
  formMessage.hidden = false;
}

function hideMessage() {
  formMessage.textContent = '';
  formMessage.hidden = true;
}

// Day 16 · Step 2: stock badge with if / else if / else (runs every time the variant changes)
function updateStockBadge() {
  const variant = variantInput.value;
  const stock = getStock(variant);
  stockBadge.classList.remove('is-ok', 'is-low', 'is-empty');
  if (variant === '') {
    stockBadge.hidden = true;
    return;
  } else if (stock === -1) {
    stockBadge.textContent = variantLabel + ' tidak dikenal';
    stockBadge.classList.add('is-empty');
  } else if (stock === 0) {
    stockBadge.textContent = variantLabel + ' ' + variant + ' habis';
    stockBadge.classList.add('is-empty');
  } else if (stock <= 3) {
    stockBadge.textContent = 'Sisa ' + stock + ', segera habis!';
    stockBadge.classList.add('is-low');
  } else {
    stockBadge.textContent = stock + ' tersedia';
    stockBadge.classList.add('is-ok');
  }
  stockBadge.hidden = false;
}

variantInput.addEventListener('change', () => {
  hideMessage();
  // checkoutBar.hidden = true;                                // old summary no longer matches the choice
  updateStockBadge();
  const stock = getStock(variantInput.value);
  if (stock > 0 && Number(quantityInput.value) > stock) {
    quantityInput.value = stock;                            // keep the quantity inside the new stock
  }
  renderSummary();
});

quantityInput.addEventListener('input', () => {
  hideMessage();
  renderSummary();
});

// Day 16 · Step 3: stepper − / + with if / else (min 1, max = stock of the chosen variant)
minusButton.addEventListener('click', () => {
  const quantity = Number(quantityInput.value);
  if (quantity > 1) {
    quantityInput.value = quantity - 1;
    hideMessage();
    renderSummary();
  } else {
    showMessage('Jumlah minimal 1.');
  }
});

plusButton.addEventListener('click', () => {
  const quantity = Number(quantityInput.value);
  const stock = getStock(variantInput.value);
  if (variantInput.value === '') {
    showMessage('Pilih ' + variantLabel.toLowerCase() + ' dulu.');
  } else if (stock === 0) {
    showMessage(variantLabel + ' ' + variantInput.value + ' sedang habis.');
  } else if (quantity >= stock) {
    showMessage('Maksimal ' + stock + ', sesuai stok.');
  } else {
    quantityInput.value = quantity + 1;
    hideMessage();
    renderSummary();
  }
});

function validateQuantityAndPrice() {
  const price = Number(priceElement.dataset.price);         // string -> number
  const quantity = Number(quantityInput.value);             // string -> number
  const variant = variantInput.value;                       // string
  const stock = getStock(variant);
  let error = '';

  if (variant === '') {
    error = 'Pilih ' + variantLabel.toLowerCase() + ' dulu.';
  } else if (stock === -1) {
    error = variantLabel + ' tidak valid.';
  } else if (!Number.isInteger(quantity) || quantity <= 0) {
    error = 'Jumlah harus bilangan bulat positif.';
  } else if (!Number.isFinite(price) || price <= 0) {
    error = 'Harga produk belum tersedia.';
  } else if (stock === 0) {
    error = variantLabel + ' ' + variant + ' sedang habis.';
  } else if (quantity > stock) {
    error = 'Jumlah melebihi stok (sisa ' + stock + ').';
  }

  return { error, price, quantity, variant };
}

function renderSummary() {
  const { error, price, quantity, variant } = validateQuantityAndPrice();
  unitList.textContent = ''; 
  
  if (error !== '') {
    showMessage(error);
    checkoutBar.hidden = true;
    return null;                                                 // stop: nothing below runs
  }

  let subtotal = 0;
  subtotal += price * quantity;
  summary.textContent = variantLabel + ': ' + variant
    + ' · Jumlah: ' + quantity
    + ' · Harga: Rp' + price.toLocaleString('id-ID');
  subtotalText.textContent = 'Rp' + subtotal.toLocaleString('id-ID');

  // Check free shipping
  if (subtotal >= FREE_SHIPPING_MIN) {
    shippingInfo.textContent = 'Gratis ongkir!';
    shippingInfo.classList.add('is-free');
  } else {
    const missing = FREE_SHIPPING_MIN - subtotal;
    shippingInfo.textContent = 'Tambah Rp' + missing.toLocaleString('id-ID') + ' lagi untuk gratis ongkir';
    shippingInfo.classList.remove('is-free');
  }

  // one chip per unit with for loop
  for (let unit = 1; unit <= quantity; unit += 1) {
    const item = document.createElement('li');
    item.textContent = 'Unit ' + unit + ' · ' + variant;
    unitList.appendChild(item);
  }

  checkoutBar.hidden = false;
  return { quantity, variant }
}



// Validate input -> tunjukkan summary, free shipping info and unit list
form.addEventListener('submit', (event) => {
  event.preventDefault();                                   // no page reload

  // validate
  const { error, quantity, variant } = validateQuantityAndPrice();

  if (error !== '') {
    showMessage(error);
    checkoutBar.hidden = true;
    return;                                                 // stop: nothing below runs
  }

  // Stok variant berkurang sesuai dengan data yang diupdate di input
  setStock(variant, getStock(variant) - quantity);
  updateStockBadge();
  updateStockSummary();

  bagItemCount += quantity;
  bagCountElement.textContent = bagItemCount;
  bagButtonElement.setAttribute('aria-label', 'Tas belanja, ' + bagItemCount + ' item');

  const productName = document.querySelector('#product-title').textContent;
  showMessage(quantity + ' ' + productName + ' ditambahkan ke tas.');

  // renderSummary();
});

checkoutButton.addEventListener('click', () => {
  checkoutToast.textContent = 'Demo: halaman pembayaran belum tersedia.';
  checkoutToast.classList.add('is-visible');
  setTimeout(() => checkoutToast.classList.remove('is-visible'), 2500);
});

if (form.dataset.stock !== undefined || variantInput.options.length > 1) {
  updateStockSummary();
}

// Expected (product 1, Rp150.000): S · 2 -> Subtotal Rp300.000, "Gratis ongkir!", 2 units
// M · 1 -> Rp150.000, "Tambah Rp150.000 lagi untuk gratis ongkir" | M · 4 -> "Jumlah melebihi stok (sisa 3)."
// L -> badge "Ukuran L habis", submit -> "Ukuran L sedang habis."
// Product 2: script.js fills data-price and data-stock from the API before the button is enabled.
