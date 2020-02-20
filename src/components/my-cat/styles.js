import { css } from "https://unpkg.com/lit-element/lit-element.js?module";

export const styles = css`
         :host {
           --radius: 6px;
         }
         .card {
           border-radius: var(--radius);
           background: white;
           margin: 40px 0;
           overflow: hidden;
         }
         .body {
           padding: 20px;
         }
         img {
           width: 100%;
           height: auto;
         }
         h2 {
           margin-top: 0;
           margin-bottom: 30px;
         }
         p {
           margin-bottom: 30px;
         }
         button {
           padding: 15px;
           font-size: 20px;
           border-radius: var(--radius);
           border: none;
           background: blue;
           color: white;
           transition: all 0.3s;
         }
         button:hover {
           box-shadow: 0px 0px 0px 3px white, 0px 0px 0px 6px blue;
         }
`