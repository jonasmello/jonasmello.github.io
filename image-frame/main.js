function changeEvent(e) {
  if (this.files && this.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      let $bg = document.createElement("img");
      $bg.setAttribute("style", "display: none");
      let $img = document.createElement("img");
      $img.setAttribute("style", "display: none");
      let $canvas = document.createElement("canvas");
      $canvas.setAttribute("style", "display: none");

      // $img.src = "./img/paisagem.jpg";
      // $img.src = "./img/retrato.jpg";
      $img.src = e.target.result;

      $img.onload = () => {
        const isLandscape = $img.width > $img.height;
        $bg.src = `./img/fundo-${isLandscape ? "paisagem" : "retrato"}.png`;

        document.body.appendChild($bg);
        document.body.appendChild($img);
        document.body.appendChild($canvas);

        $bg.onload = () => {
          console.log(`🚀 : $bg:`, $bg);
          const context = $canvas.getContext("2d");
          $canvas.width = $bg.width;

          $canvas.height = $bg.height;

          context.globalAlpha = 1.0;
          context.drawImage($bg, 0, 0);
          context.globalAlpha = 0.5;
          if (isLandscape) {
            context.drawImage($img, 188, 159, 302, 200);
          } else {
            context.drawImage($img, 155, 175, 205, 305);
          }

          const b64Img = $canvas.toDataURL("image/png");
          const $result = document.createElement("img");
          $result.src = b64Img;
          document.body.appendChild($result);
        };
      };
    };
    reader.readAsDataURL(this.files[0]);
  }
}

(function () {
  const $input = document.querySelector("input");

  $input.addEventListener("change", changeEvent);
})();
