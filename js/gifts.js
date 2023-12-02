const ALL_GIFTS = [
  {
    product: "Saco de ração de Bolt",
    price: 150.0,
    img: "https://picsum.photos/id/1/192/128",
    id: 1,
    stock: false,
  },
  {
    product: "Parcela do fogão",
    price: 300.0,
    img: "https://picsum.photos/id/2/192/128",
    id: 2,
    stock: true,
  },
  {
    product: "Parcela da geladeira",
    price: 400.0,
    img: "https://picsum.photos/id/3/192/128",
    id: 3,
    stock: true,
  },
  {
    product: "Banho e tosa de Bolt",
    price: 100.0,
    img: "https://picsum.photos/id/4/192/128",
    id: 4,
    stock: true,
  },
  {
    product: "Um mês de academia para os noivos",
    price: 200.0,
    img: "https://picsum.photos/id/5/192/128",
    id: 5,
    stock: true,
  },
];

const loadGifts = (function renderGifts() {
  const showGifts = document.getElementsByClassName("show-gifts")[0];

  const giftsHTML = ALL_GIFTS.map(
    (gift) =>
      `<div
      class="gift ${!gift.stock && "gift-sold"}"
      id="gift-${gift.id}"
      onclick="handleGenerateGift(${gift.id},${gift.price},'${gift.product}')"
    >
      <img src="${gift.img}" alt="${gift.product}" />
      <span>${gift.product} | R$${gift.price.toFixed(2)}</span>
    </div>`
  ).join("");

  showGifts.innerHTML = giftsHTML;
})();
