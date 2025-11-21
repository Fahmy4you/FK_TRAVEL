(function () {
  const head = document.head;

  // Buat elemen <link> untuk preconnect Google Fonts
  const preconnect1 = document.createElement("link");
  preconnect1.rel = "preconnect";
  preconnect1.href = "https://fonts.googleapis.com";

  const preconnect2 = document.createElement("link");
  preconnect2.rel = "preconnect";
  preconnect2.href = "https://fonts.gstatic.com";
  preconnect2.crossOrigin = "anonymous";

  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Parisienne&family=Poppins:wght@400;500;600;700;800;900&display=swap";

  const outputCssLink = document.createElement("link");
  outputCssLink.rel = "stylesheet";
  outputCssLink.href = "styles/output.css";

  const relIconLight = document.createElement("link");
  relIconLight.rel = "icon";
  relIconLight.href = "/public/images/logoimage.png";
  relIconLight.media = "(prefers-color-scheme: light)";

  const relIconDark = document.createElement("link");
  relIconDark.rel = "icon";
  relIconDark.href = "/public/images/logoimagedark.png";
  relIconDark.media = "(prefers-color-scheme: dark)";

  const helperScript = document.createElement("script");
  helperScript.src = "/script/helper.js";

  const fontAwesomeLink = document.createElement("link");
  fontAwesomeLink.rel = "stylesheet";
  fontAwesomeLink.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css";
  fontAwesomeLink.integrity =
    "sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==";
  fontAwesomeLink.crossOrigin = "anonymous";
  fontAwesomeLink.referrerPolicy = "no-referrer";

  // Tambahkan ke <head>
  head.appendChild(preconnect1);
  head.appendChild(preconnect2);
  head.appendChild(fontLink);
  head.appendChild(outputCssLink);
  head.appendChild(relIconLight);
  head.appendChild(relIconDark);
  head.appendChild(helperScript);
  head.appendChild(fontAwesomeLink);
})();
