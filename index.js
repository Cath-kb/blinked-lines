import { params } from './params.js'

const generateRandomColor = () => '#'+(Math.random()*(1<<24)|0).toString(16)

const generateCssString = styles => {
  let str = ''
  if ('width' in styles) str +=`width: ${styles.width}%;`
  if ('height' in styles) str +=`height: ${styles.height}%;`
  if ('background' in styles) str +=`background: ${styles.background};`
  return str
}

const setBackground = el => {
  el.style.background = generateRandomColor()
}

const createDiv = (className, cssStyles) => {
  const el = document.createElement('div')
  el.classList.add(className)
  el.style.cssText = cssStyles
  return el
}

const render = (lines, root) => {
  const linesCount = params.lines.length
  if (!linesCount) throw new Error('No Lines to Render!')
  const lineHeight = 100/linesCount

  lines.forEach(line => {
    const lineDOM = createDiv('line', generateCssString({...line, height: lineHeight}))
    line.elements.forEach(element => {
      const elementDOM = createDiv('element', generateCssString(element))
      lineDOM.appendChild(elementDOM)
      setInterval(() => setBackground(elementDOM), line.updateTime)
    })
    root.appendChild(lineDOM)
  })
}

render(params.lines, document.getElementById('root'))
