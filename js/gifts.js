const mp = new MercadoPago("APP_USR-07e0f4f2-0701-4c04-8f86-18153498f343", {
  locale: "pt-BR",
});

const ALL_GIFTS = [
  {
    product: "Saco de ração de Bolt",
    price: 150.0,
    img: "../assets/gifts/liva.jpg",
    id: 1,
    stock: false,
  },
  {
    product: "Parcela do fogão",
    price: 300.0,
    img: "../assets/gifts/cooktop.png",
    id: 2,
    stock: true,
  },
  {
    product: "Parcela da geladeira",
    price: 400.0,
    img: "../assets/gifts/geladeira.png",
    id: 3,
    stock: true,
  },
  {
    product: "Banho e tosa de Bolt",
    price: 100.0,
    img: "../assets/gifts/bolt.jpeg",
    id: 4,
    stock: false,
  },
  {
    product: "Um mês de academia para os noivos",
    price: 200.0,
    img: "../assets/gifts/academia.jpg",
    id: 5,
    stock: true,
  },
  {
    product: "Metade da parcela dos móveis da cozinha",
    price: 350.0,
    img: "../assets/gifts/cozinha.jpg",
    id: 6,
    stock: true,
  },
  {
    product: "Parcela dos móveis da cozinha",
    price: 700.0,
    img: "../assets/gifts/cozinha.jpg",
    id: 7,
    stock: true,
  },
  {
    product: "Escolinha de Futebol para Gustavo",
    price: 200.0,
    img: "../assets/gifts/futebol.jpeg",
    id: 8,
    stock: true,
  },
  {
    product: "Feira do mês",
    price: 500.0,
    img: "../assets/gifts/feira.jpeg",
    id: 9,
    stock: true,
  },
  {
    product: "Cadeira de escritório para a noiva",
    price: 300.0,
    img: "../assets/gifts/cadeira.jpg",
    id: 10,
    stock: true,
  },
  {
    product: "Parcela Guarda-roupa",
    price: 400.0,
    img: "../assets/gifts/guarda-roupa.jpg",
    id: 11,
    stock: true,
  },
  {
    product: "Parcela móvel do banheiro",
    price: 250.0,
    img: "../assets/gifts/banheiro.jpeg",
    id: 12,
    stock: true,
  },
  {
    product: "Parcela do forninho da Giovana",
    price: 150.0,
    img: "../assets/gifts/forninho.jpg",
    id: 13,
    stock: true,
  },
  {
    product: "Parcela do robô aspirador (pra perseguir Bolt)",
    price: 200.0,
    img: "../assets/gifts/robo-aspirador.jpg",
    id: 14,
    stock: true,
  },
  {
    product: "Jogo de cama",
    price: 75.0,
    img: "../assets/gifts/jogo-de-cama.jpeg",
    id: 15,
    stock: false,
  },
];

const handleGenerateGift = async (price, product) => {
  document.getElementsByClassName("gift-button")[0].innerHTML = "";

  const loader = document.getElementById("actions-container");
  loader.innerHTML += `<div id="gifts-button-loader">
    <img src="../assets/white-loader.svg" alt="loader" class="loader" />
  </div>`;

  try {
    const response = await fetch("https://back-casorio.vercel.app/api", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price,
        product,
      }),
    });
    const data = await response.json();

    const element = document.getElementById("gifts-button-loader");
    element.remove();

    mp.checkout({
      preference: {
        id: data.id,
      },
      render: {
        container: `.gift-button`,
        label: "PAGAR AGORA",
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const loadGifts = (function renderGifts() {
  const showGifts = document.getElementsByClassName("show-gifts")[0];

  const giftsHTML = ALL_GIFTS.map(
    (gift) =>
      `<div
      class="gift ${!gift.stock ? "gift-sold" : ""}"
      id="gift-${gift.id}"
      onclick="handleGenerateGift(${gift.price},'${gift.product}')"
    >
      <img src="${gift.img}" alt="${gift.product}" />
      <span>${gift.product} | R$${gift.price.toFixed(2)}</span>
    </div>`
  ).join("");

  showGifts.innerHTML = giftsHTML;
})();
