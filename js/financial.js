const mp = new MercadoPago("APP_USR-07e0f4f2-0701-4c04-8f86-18153498f343", {
  locale: "pt-BR",
});

var selectedMethod = undefined;
var generatedPreference = false;

const copyText = (stringToCopy) => {
  navigator.clipboard.writeText(stringToCopy);

  Toastify({
    text: "Copiado com sucesso!",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    backgroundColor: "#42ba96",
    stopOnFocus: true, // Prevents dismissing of toast on hover
    onClick: function () {}, // Callback after click
  }).showToast();
};

function toggleActive(itemId) {
  var moneySection = document.getElementsByClassName("money-section")[0];
  if (!moneySection.classList.contains("fade")) {
    moneySection.style.display = "flex";
    moneySection.classList.add("fade");
  }

  ["pix-method", "ted-method", "other-method"].map((item) => {
    var element = document.getElementById(item);

    if (item === itemId) {
      element.classList.add("active");
      selectedMethod = itemId;
    } else {
      element.classList.remove("active");
    }
  });

  if (generatedPreference) {
    showPaymentMethodInfo();
    showThanks();
  }
}

function showPaymentMethodInfo() {
  const toShow = selectedMethod.split("-")[0] + "-info";

  ["pix-info", "ted-info", "other-info"].map((infoItem) => {
    var infoDiv = document.getElementById(infoItem);

    if (infoDiv) {
      if (infoItem === toShow) {
        infoDiv.style.display = "flex";
      } else {
        infoDiv.style.display = "none";
      }
    }
  });
}

function showThanks() {
  const thanksDiv = document.getElementsByClassName("thanks")[0];
  const pixKey = document.getElementsByClassName("pix-key")[0];

  if (generatedPreference) {
    thanksDiv.style.display = "flex";

    if (selectedMethod === "pix-method") {
      pixKey.style.display = "flex";
    } else {
      pixKey.style.display = "none";
    }
  }
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

function toggleDisableWhenLoading() {
  const methods = document.getElementById("methods");
  methods.classList.toggle("disabled");
  const moneyDiv = document.getElementById("money-div");
  moneyDiv.classList.toggle("disabled");
  const addMoney = document.getElementById("add-money");
  addMoney.classList.toggle("disabled");
  const confirmValue = document.getElementById("confirm-value");
  confirmValue.classList.toggle("disabled");
}

function mountInstallmentsTable(data) {
  const taxTable = document.getElementsByClassName("tax-table")[0];

  const first = data.installments
    .slice(0, 6)
    .map((item) => `<div class="table-cel">${item.parcels}</div>`)
    .join("");
  const second = data.installments
    .slice(6)
    .map((item) => `<div class="table-cel">${item.parcels}</div>`)
    .join("");

  const toRender = `
    <div class="table-column">
      ${first}
    </div>
    <div class="table-column">
      ${second}
    </div>
  `;

  taxTable.innerHTML = toRender;
}

function togglePixLoader(show) {
  const pixImgDivLoader =
    document.getElementsByClassName("pix-img-div-loader")[0];
  pixImgDivLoader.style.display = show ? "flex" : "none";

  const copyPixHash = document.getElementById("copy-pix-hash");
  copyPixHash.innerHTML = show
    ? `<img src="../assets/loader.svg" alt="loader" class="loader" />`
    : "Pix Copia e Cola";
}

const handleGeneratePreference = async () => {
  const price = document.getElementById("gift-value").value;
  document.getElementsByClassName("gift-button")[0].innerHTML = "";
  const button = document.getElementById("confirm-value");
  button.innerHTML = `<img src="../assets/white-loader.svg" alt="loader" class="loader" />`;

  toggleDisableWhenLoading();
  togglePixLoader(true);

  try {
    const response = await fetch("https://back-casorio.vercel.app/api", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price,
      }),
    });
    const data = await response.json();

    mountInstallmentsTable(data);

    button.innerHTML = `Confirmar`;
    toggleDisableWhenLoading();
    generatedPreference = true;
    showThanks();
    showPaymentMethodInfo();

    const pixImg = document.getElementById("pix-img");
    const copyPixHash = document.getElementById("copy-pix-hash");

    pixImg.src = `data:image/jpeg;base64,${data.pix.qr_code_base64}`;
    copyPixHash.onclick = () => copyText(data.pix.qr_code_base64.trim());
    togglePixLoader(false);

    mp.checkout({
      preference: {
        id: data.id,
      },
      render: {
        container: ".gift-button",
        label: "PRESENTEAR",
      },
    });
  } catch (err) {
    console.error(err);
  }

  // document.getElementsByClassName("pix-div")[0].innerHTML = `
  //   <h5>Para valores avulsos:</h5>
  //   <span id="pix-key" onclick="copyText('e84b74ce-29e8-408f-96f4-4efe18bc1927')">Copiar chave pix <b>e84b74ce-29e8-408f-96f4-4efe18bc1927</b></span>
  // `;
};
