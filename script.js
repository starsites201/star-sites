document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      name: "Site Personalizado - Sem Domínio Personalizado",
      price: 10.0,
      description: "Um Site De Vendas Personalizado Para Você.",
      image: "site.jpg", // coloque uma imagem com esse nome na pasta
      pixCode:
        "00020126580014BR.GOV.BCB.PIX013692907f20-f786-4997-bc3f-e62c3bd2503d520400005303986540510.005802BR5924Matheus Henrique Lima da6009SAO PAULO62140510gKM8FmdVTT63043E72",
      qrImage: "qrcode-site.png", // coloque um QR Code dessa chave nessa imagem
    },
    // Você pode adicionar mais produtos aqui
  ];

  const productsContainer = document.getElementById("products");
  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  const pixContainer = document.getElementById("pix");
  const qrImage = document.getElementById("qr-code");
  const pixCodeText = document.getElementById("pix-code");
  const sendProofButton = document.getElementById("send-proof");
  const viewProductsBtn = document.getElementById("view-products");
  const entrada = document.getElementById("entrada");
  const loja = document.getElementById("loja");

  let cart = [];
  let total = 0;
  let currentPix = "";

  viewProductsBtn.addEventListener("click", () => {
    entrada.classList.add("hidden");
    loja.classList.remove("hidden");
  });

  function renderProducts() {
    products.forEach((product, index) => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p><strong>R$ ${product.price.toFixed(2)}</strong></p>
        <button onclick="toggleDescription(${index})">Ver Detalhes</button>
        <p id="desc-${index}" class="hidden">${product.description}</p>
        <button onclick="addToCart(${index})">Adicionar no Carrinho</button>
      `;
      productsContainer.appendChild(div);
    });
  }

  window.toggleDescription = function (index) {
    const desc = document.getElementById(`desc-${index}`);
    desc.classList.toggle("hidden");
  };

  window.addToCart = function (index) {
    const product = products[index];
    cart.push(product);
    total += product.price;
    updateCart();
  };

  function updateCart() {
    cartContainer.innerHTML = "";
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
      cartContainer.appendChild(li);
    });
    totalElement.textContent = total.toFixed(2);
    pixContainer.classList.add("hidden");
  }

  document
    .getElementById("checkout")
    .addEventListener("click", function () {
      if (cart.length === 0) return alert("Carrinho vazio!");

      const lastItem = cart[cart.length - 1]; // usa o último adicionado
      currentPix = lastItem.pixCode;

      qrImage.src = lastItem.qrImage;
      pixCodeText.textContent = currentPix;
      pixContainer.classList.remove("hidden");
    });

  sendProofButton.addEventListener("click", () => {
    const message = encodeURIComponent(
      `Olá! Aqui está o comprovante do pagamento via PIX no valor de R$ ${total.toFixed(
        2
      )}. Produto: ${cart.map((p) => p.name).join(", ")}`
    );
    window.open(`https://wa.me/5547996400867?text=${message}`, "_blank");
  });

  renderProducts();
});
