import { shellLoading, sleep } from "../../utils.js";

const tag = "my-cat";

shellLoading({ importMeta: import.meta }, tag);

(async function loadMyCat() {
  await sleep(1000)
  const { MyCat } = await import('./MyCat.js')
  window.customElements.define(tag, MyCat)
})()
