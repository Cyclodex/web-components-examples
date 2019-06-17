customElements.define(
  "my-quickline",
  class extends HTMLElement {
    constructor() {
      super();

      const self = this;

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let div = document.createElement("div");
          div.innerHTML = this.responseText;
          self.attachShadow({ mode: "open" }).appendChild(div);
        }
      };

      xhttp.open("GET", "quickline.html", true);
      xhttp.send();
    }
  }
);
