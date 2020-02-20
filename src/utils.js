function shellSubstitute(tag, shell = "") {
  // Destructuring makes a copy, therefore exactly the same elements will have their content restored
  const instances = [...document.querySelectorAll(tag)];
  const contentMap = instances.map(el => {
    const originalContent = el.innerHTML;
    el.innerHTML = shell;
    el.style.display = "inline";
    return originalContent;
  });
  // window.customElements.whenDefined(tag).then(() => {
  //   instances.forEach((el, i) => (el.innerHTML = contentMap[i]));
  // });
}

async function getShell(absoluteShellPath) {
  const shell = await (await fetch(absoluteShellPath)).text()
  return Promise.resolve(shell)
}

async function shellLoading (path, tag) {
  shellSubstitute(tag, await getShell(path))
}

export { shellLoading };
