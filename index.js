const mp = new MercadoPago("APP_USR-07e0f4f2-0701-4c04-8f86-18153498f343", {
  locale: "pt-BR",
});

const copyText = (stringToCopy) => {
  navigator.clipboard.writeText(stringToCopy);
};

const handleGeneratePreference = async () => {
  const price = document.getElementById("donation_value").value;

  const response = await fetch("http://localhost:3000/api", {
    // const response = await fetch("https://back-casorio.vercel.app/api", {
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

  document.getElementById("willReceive").innerHTML = `
  <h5>Aviso:</h5>
  <span>
    Os noivos receberão R$${Number(data.willReceive).toFixed(
      2
    )} através do botão abaixo ou R$${Number(price).toFixed(2)} através do pix
  </span>
  `;

  document.getElementsByClassName("pix-div")[0].innerHTML = `
    <img id="pix-qr" src="data:image/jpeg;base64,${
      data.pix.qr_code_base64
    }" alt="Pix" />
    <span id="pix" onclick="copyText('${data.pix.qr_code.trim()}')">Copiar</span>
    
    <h5>Para valores avulsos:</h5>
    <span id="pix-key" onclick="copyText('e84b74ce-29e8-408f-96f4-4efe18bc1927')">Copiar chave pix <b>e84b74ce-29e8-408f-96f4-4efe18bc1927</b></span>
  `;

  mp.checkout({
    preference: {
      id: data.id,
    },
    render: {
      container: ".cho-container",
      label: "Outros Métodos",
    },
  });
};
