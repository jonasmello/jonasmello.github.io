const createElements = (src) => {
  const $bg = document.createElement("img");
  $bg.setAttribute("style", "display: none");
  const $imgFromInput = document.createElement("img");
  $imgFromInput.setAttribute("style", "display: none");
  const $canvas = document.createElement("canvas");
  $canvas.setAttribute("style", "display: none");
  $imgFromInput.src = src;

  return [$bg, $imgFromInput, $canvas];
};

const makeImage = (src) => {
  [$bg, $imgFromInput, $canvas] = createElements(src);

  $imgFromInput.onload = () => {
    const ratio = $imgFromInput.width / $imgFromInput.height;

    const isLandscape = $imgFromInput.width > $imgFromInput.height;
    $bg.src = `./img/novo-bg-com-logo?3`;

    $bg.onload = () => {
      const context = $canvas.getContext("2d");
      $canvas.width = $bg.width;
      $canvas.height = $bg.height;

      const landscapeHeight = 425;

      const dimensions = isLandscape
        ? [
            280 + (550 - landscapeHeight * ratio) / 2,
            250,
            landscapeHeight * ratio,
            landscapeHeight,
          ]
        : [280, 150, 550, 550 / ratio];

      // context.globalAlpha = 0.8;
      context.globalAlpha = 1;
      context.drawImage($imgFromInput, ...dimensions);
      context.drawImage($bg, 0, 0);

      // context.globalAlpha = 1;
      // context.drawImage($bg, 0, 0);
      // context.globalAlpha = 0.5;
      // context.drawImage($imgFromInput, ...dimensions);

      const b64Img = $canvas.toDataURL("image/png");
      const $result = document.createElement("img");
      $result.src = b64Img;
      $result.setAttribute("style", "max-width: 80vw; max-height: 80vh");

      document.body.appendChild($result);
    };
  };
};

function changeEvent(e) {
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      makeImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
}

(function () {
  const $input = document.querySelector("input");

  $input.addEventListener("change", changeEvent);

  // const paisagem = "./tmp/paisagem.jpg";
  // const retrato = "./tmp/retrato.jpg";

  // makeImage(paisagem);
})();
