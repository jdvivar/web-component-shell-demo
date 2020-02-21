import {
    LitElement,
    html
  } from "https://unpkg.com/lit-element/lit-element.js?module";
import {
    unsafeHTML
  } from "https://unpkg.com/lit-html//directives/unsafe-html.js?module";
import { styles } from "./styles.js";
import { getShell, sleep } from "../../utils.js"

import { generateText as getChiquitoIpsumText } from "../../chiquito-ipsum.js";

export class MyCat extends LitElement {
    static get styles() {
      return styles;
    }

    static get properties() {
      return {
        image: String,
        name: String,
        description: String,
        // shell: String,
        // allLoaded: Boolean,
        // imgLoaded: Boolean
      };
    }
    constructor() {
      super();
      this.image = '';
      this.name = '';
      this.description = '';
      // this.shell = '';
      // this.allLoaded = false;
      // this.imgLoaded = false;
    }
    
    connectedCallback() {
      super.connectedCallback();
      this.setName();
      this.setImage();
      this.setDescription();
      // this.renderShell();
    }

    async setName() {
      await sleep(2000)
      this.name = await (await fetch(
        "https://dinoipsum.herokuapp.com/api/?format=text&words=1&paragraphs=1"
      )).text();
    }

    async setImage() {
      await sleep(3000)
      const pixels = 300 + Math.floor(Math.random() * 10);
      this.image = `https://placekitten.com/${pixels}/187`;
    }

    async setDescription() {
      await sleep(1000)
      this.description = getChiquitoIpsumText()
        .substring(3, 200)
        .concat(" ...");
    }

    async renderShell() {
      const arrayUrl = import.meta.url.split('/')
      arrayUrl.pop()
      arrayUrl.push('shell.html')
      const url = arrayUrl.join('/')
      let shell = await getShell(url)
      this.shell = unsafeHTML(shell)
    }

    render() {
      // this.checkAllLoaded()
      return html`
        <div class="card">
          <img src=${this.image} @load=${this.imgLoaded} />
          <div class="body">
            <h2>${this.name}</h2>
            <p>${this.description}</p>
            <button>Meow</button>
          </div>
        </div>
        `
    }
  }