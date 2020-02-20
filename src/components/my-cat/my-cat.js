import {
  LitElement,
  html,
  css
} from "https://unpkg.com/lit-element/lit-element.js?module";
import { styles } from "./styles.js";
import { shellLoading } from "../../utils.js";
import { generateText as getChiquitoIpsumText } from "../../chiquito-ipsum.js";

const tag = "my-cat";

shellLoading("src/components/my-cat/shell.html", tag);

window.setTimeout(
  () =>
    window.customElements.define(
      tag,
      class extends LitElement {
        static get styles() {
          return styles;
        }

        static get properties() {
          return { name: String };
        }
        constructor() {
          super();
          this.setName();
          this.setImage();
          this.setDescription();
        }

        async setName() {
          this.name = await (await fetch(
            "https://dinoipsum.herokuapp.com/api/?format=text&words=1&paragraphs=1"
          )).text();
        }

        async setImage() {
          const pixels = 300 + Math.floor(Math.random() * 10);
          this.image = `https://placekitten.com/${pixels}/187`;
        }

        async setDescription() {
          this.description = getChiquitoIpsumText()
            .substring(3, 200)
            .concat(" ...");
        }

        render() {
          return html`
            <div class="card">
              <img src="${this.image}" />
              <div class="body">
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <button>Meow</button>
              </div>
            </div>
          `;
        }
      }
    ),
  5000
);
