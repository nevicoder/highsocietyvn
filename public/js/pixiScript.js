const app = new PIXI.Application({ width: 1200, height: 400 });
document.querySelector(".container .pixi__container").appendChild(app.view);
let texture = PIXI.Texture.from("../../img/pixi_texture.jpg");
let sprite1 = new PIXI.Sprite(texture);
app.stage.addChild(sprite1);

let renderTexture = PIXI.RenderTexture.create(
  app.screen.width,
  app.screen.height
);
let renderTexture2 = PIXI.RenderTexture.create(
  app.screen.width,
  app.screen.height
);
const currentTexture = renderTexture;

// create a new sprite that uses the render texture we created above
const outputSprite = new PIXI.Sprite(currentTexture);

// align the sprite
outputSprite.x = app.screen.width / 2;
outputSprite.y = app.screen.height / 2;
outputSprite.anchor.set(0.5);
//background

// add to stage
app.stage.addChild(outputSprite);
const style = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 50,
  fontWeight: "bold",
  fill: ["#ffffff", "#00ff99"], // gradient
  stroke: "#4a1850",
  strokeThickness: 8,
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 8,
  lineJoin: "round",
});
const basicText = new PIXI.Text("HIGH SOCIETY VIETNAM", style);

basicText.x = app.screen.width / 2 - basicText.width / 2;
basicText.y = app.screen.height / 2 - basicText.height / 2;
app.stage.addChild(basicText);

const stuffContainer = new PIXI.Container();

stuffContainer.x = 720;
stuffContainer.y = 200;

app.stage.addChild(stuffContainer);

// create an array of image ids..
// const fruits = [
//   "../img/banner/resized/shroom.png",
//   "../img/banner/resized/aya.png",
//   "../img/banner/resized/thc.png",
//   "../img/banner/resized/dmt.png",
//   "../img/banner/resized/gd.png",
//   "../img/banner/resized/ket.png",
//   "../img/banner/resized/mescaline.png",
//   "../img/banner/resized/meth.png",
//   // "../img/banner/resized/poppy.png",
//   "../img/banner/resized/xanax.png",
//   "../img/banner/resized/mdma.png",
// ];

// // create an array of items
// const items = [];

// // now create some items and randomly position them in the stuff container
// for (let i = 0; i < fruits.length; i++) {
//   const item = PIXI.Sprite.from(fruits[i % fruits.length]);
//   item.x = Math.random() * (Math.random() * (600 - 400) + 400) - 50;
//   item.y = Math.random() * (Math.random() * (600 - 400) + 400) - 50;
//   item.anchor.set(Math.random());
//   stuffContainer.addChild(item);
//   items.push(item);
// }

// used for spinning!
let count = 0;

app.ticker.add(() => {
  // for (let i = 0; i < items.length; i++) {
  //   // rotate each item
  //   const item = items[i];
  //   item.rotation += 0.06;
  // }

  count += 0.01;

  // swap the buffers ...
  const temp = renderTexture;
  renderTexture = renderTexture2;
  renderTexture2 = temp;

  // set the new texture
  outputSprite.texture = renderTexture;

  // twist this up!
  stuffContainer.rotation -= 0.01;
  outputSprite.scale.set(1 + Math.sin(count) * 0.2);

  // render the stage to the texture
  // the 'true' clears the texture before the content is rendered
  app.renderer.render(app.stage, renderTexture2, false);
});