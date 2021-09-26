const mp = new MercadoPago("APP_USR-07e0f4f2-0701-4c04-8f86-18153498f343", {
  locale: "pt-BR",
});

var selectedMethod = undefined;

function toggleActive(itemId) {
  ["pix-method", "ted-method", "other-method"].map((item) => {
    var element = document.getElementById(item);

    if (item === itemId) {
      element.classList.add("active");
      selectedMethod = itemId;
    } else {
      element.classList.remove("active");
    }
  });
}

function addValue(valueToAdd) {
  const input = document.getElementById("gift-value");
  input.value = Number(input.value) + valueToAdd;
  willReceive();
}

function calculateWillReceive(value) {
  return (Number(value) * (100 - 3.99)) / 100;
}

function willReceive() {
  const element = document.getElementsByClassName("disclaimer")[0];
  const price = document.getElementById("gift-value").value;
  const discounted = calculateWillReceive(price);

  element.innerHTML = `
    Os noivos receberão <b>R$${Number(price).toFixed(
      2
    )}</b> através do pix ou ted ou <b>R$${Number(discounted).toFixed(
    2
  )}</b> através dos outros meios
  `;
}
willReceive();

const handleGeneratePreference = async () => {
  const price = document.getElementById("gift-value").value;

  // const response = await fetch("http://localhost:3000/api", {
  // const response = await fetch("https://back-casorio.vercel.app/api", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     price,
  //   }),
  // });
  // const data = await response.json();

  // document.getElementsByClassName("pix-div")[0].innerHTML = `
  //   <img id="pix-qr" src="data:image/jpeg;base64,${
  //     data.pix.qr_code_base64
  //   }" alt="Pix" />
  //   <span id="pix" onclick="copyText('${data.pix.qr_code.trim()}')">Copiar</span>

  //   <h5>Para valores avulsos:</h5>
  //   <span id="pix-key" onclick="copyText('e84b74ce-29e8-408f-96f4-4efe18bc1927')">Copiar chave pix <b>e84b74ce-29e8-408f-96f4-4efe18bc1927</b></span>
  // `;

  // mp.checkout({
  //   preference: {
  //     id: data.id,
  //   },
  //   render: {
  //     container: ".cho-container",
  //     label: "PRESENTEAR",
  //   },
  // });
};
