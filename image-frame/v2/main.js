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
    $bg.src = `./img/fondue.png?3`;

    $bg.onload = () => {
      const context = $canvas.getContext("2d");
      $canvas.width = $bg.width;
      $canvas.height = $bg.height;

      const landscapeHeight = 1000;

      const dimensions = isLandscape
        ? [
            1200 + (550 - landscapeHeight * ratio) / 2,
            750,
            landscapeHeight * ratio,
            landscapeHeight,
          ]
        : [880, 750, 1150, 1150 / ratio];

      context.globalAlpha = 1;
      context.drawImage($imgFromInput, ...dimensions);
      // context.globalAlpha = 0.6;
      context.drawImage($bg, 0, 0);

      // context.globalAlpha = 1;
      // context.drawImage($bg, 0, 0);
      // context.globalAlpha = 0.5;
      // context.drawImage($imgFromInput, ...dimensions);

      const b64Img = $canvas.toDataURL("image/png");
      const $result = document.createElement("img");
      $result.src = b64Img;
      $result.setAttribute("style", "max-width: 80vw; max-height: 80vh");

      const $div = document.createElement("div");
      $div.className = "image-ct";

      const $close = document.createElement("div");
      $close.className = "close";
      $close.innerText = "x";
      $close.onclick = (e) => {
        e.target.parentNode.remove();
      };

      $div.appendChild($close);
      $div.appendChild($result);

      document.body.appendChild($div);
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
  window.onbeforeunload = function (event) {
    event.preventDefault();
    return;
  };

  const $input = document.querySelector("input");

  $input.addEventListener("change", changeEvent);

  // makeImage("./tmp/paisagem.jpg");
  // makeImage("./tmp/retrato.jpg");
})();
