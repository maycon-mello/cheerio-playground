export const htmlSource =
`<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script type="text/javascript" src="http://downloads.moovweb.com/uranium/1.0.176/uranium.js"></script>

  </head>
  <body>
    <div class="images">
      <img src="http://placekitten.com/g/200/200"/>
      <img src="http://placekitten.com/g/200/200"/>
      <img src="http://placekitten.com/g/200/200"/>
      <img src="http://placekitten.com/g/200/200"/>
      <img src="http://placekitten.com/g/200/200"/>
    </div>

    <!-- Uranium Style -->
    <style>
      [data-ur-set="carousel"] {
        overflow: hidden;
        position: relative;
      }
      [data-ur-carousel-component="scroll_container"] {
        clear: both;
        display: block;
      }
      [data-ur-carousel-component="scroll_container"]:after {
        clear: both;
        content: "";
        display: table;
      }
      [data-ur-carousel-component="scroll_container"] img {
        -webkit-user-drag: none;
      }
      [data-ur-carousel-component="item"] {
        display: inline-block;
        float: left;
      }
    </style>
  </body>
</html>`;

export const js =
`let images = $(".images");
let carousel = images.wrap("div", {
  "data-ur-set": "carousel",
  "data-ur-infinite":"disabled"
}).parent();

carousel.create("button", "top", {
  "data-ur-carousel-component": "button",
  "data-ur-carousel-button-type": "prev",
  content: "Prev",
});

carousel.create("button", "bottom", {
  "data-ur-carousel-component": "button",
  "data-ur-carousel-button-type": "next",
  content: "Next",
});

// Scroll container
images.attr({
  "data-ur-carousel-component": "scroll_container",
});

images.find("img").attr("data-ur-carousel-component", "item");`;

export const htmlOutput = '';
