import realLogo from '../components/real_logo.png'

export default function () {
  // Random integer function taken from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

  const ElementPosition = function ElementPosition(element, x, y, dWidth, dHeight, yVelocity) {
    this.element = element;
    this.x = x;
    this.y = y;
    this.dWidth = dWidth;
    this.dHeight = dHeight;
    this.yVelocity = yVelocity;
  };

  ElementPosition.prototype.updateY = function updateY() {
    this.y = this.y + this.yVelocity;
  };

  const EmojiCatRain = function EmojiCatRain() {
    this.canvas = document.createElement('canvas');
    let h = window.innerHeight;
    let w = window.innerWidth;
    this.canvas.height = h;
    this.canvas.width = w;

    let catElemBuf = [];

    let catEmojis = ['😸', '😹', '😺', '😻', '😼', '😽', '🙀', '😿', '😾'];
    var img = new Image();
    img.src = realLogo;


    let ctx = this.canvas.getContext('2d');

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };

    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillRect(0, 0, w - 1, h - 1);

    document.querySelector('#root').parentNode.insertAdjacentElement("beforebegin", this.canvas);

    this.resetButton = document.createElement("button");
    this.resetButton.innerHTML = "Reset Canvas";
    // attach event listener to the button 
    this.resetButton.addEventListener('click', function resetButtonClickEventListener(e) {
      if (e.target && e.target.nodeName === 'BUTTON') {
        console.log("Reset Clicked");
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, w - 1, h - 1);
        catElemBuf = [];
      }
    });

    document.body.insertBefore(this.resetButton, document.body.nextSibling);

    window.requestAnimationFrame(function draw() {

      let numNewEmojis = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1];
      let newEmojisIndex = getRandomIntInclusive(0, 10);

      for (let i = 0; i < numNewEmojis[newEmojisIndex]; i++) {
        let x = getRandomIntInclusive(0, w - 1);
        let y = -42;
        let size = getRandomIntInclusive(30, 240);
        let dWidth = size;
        let dHeight = size;
        let yVelocity = getRandomIntInclusive(1, 3);
        let catElem = catEmojis[getRandomIntInclusive(0, catEmojis.length - 1)];
        // let catElem = '🤔';
        let elementPosition = new ElementPosition(catElem, x, y, dWidth, dHeight, yVelocity);
        catElemBuf.push(elementPosition);
      }

      catElemBuf.forEach(element => {
        element.updateY();
      });

      catElemBuf = catElemBuf.filter(elem => {
        if (elem.y > h - 1 + 42) {
          return false;
        }
        return true;
      });

      // ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, w - 1, h - 1);

      catElemBuf.forEach(elem => {
        var image = document.getElementById('source');
        ctx.drawImage(image, elem.x, elem.y, elem.dWidth, elem.dWidth);
      });
      window.requestAnimationFrame(draw);
    });
  }
  // Allow inclusion in browers and node
  window.EmojiCatRain = EmojiCatRain;
  window.ecr = new EmojiCatRain();
}