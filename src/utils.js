function shellSubstitute (tag, shell = '') {
  // Destructuring makes a copy, therefore exactly the same elements will have their content restored
  const instances = [...document.querySelectorAll(tag)]
  const contentMap = instances.map(el => {
    const originalContent = el.innerHTML
    el.innerHTML = shell
    el.style.display = 'inline'
    return originalContent
  })
  window.customElements.whenDefined(tag).then(() => {
    instances.forEach((el, i) => (el.innerHTML = contentMap[i]))
  })
}

async function getShell (absoluteShellPath) {
  const shell = await (await window.fetch(absoluteShellPath)).text()
  return Promise.resolve(shell)
}

async function shellLoading (options, tag) {
  const SHELL_DEFAULT_NAME = 'shell.html'
  if (!tag) {
    return
  }
  let path = options.path || ''
  const importMeta = options.importMeta || {}

  if (path === '') {
    if (importMeta === {}) {
      return
    } else {
      const arrayUrl = importMeta.url.split('/')
      arrayUrl.pop()
      arrayUrl.push(SHELL_DEFAULT_NAME)
      path = arrayUrl.join('/')
    }
  }
  shellSubstitute(tag, await getShell(path))
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export { getShell, shellLoading, sleep }
