import { baseGenerator } from 'astring'

// Create a custom generator that inherits from Astring's default generator
const customGenerator = Object.assign({}, baseGenerator, {
  Literal (node, state) {
    if (node.raw != null) {
      const first = node.raw.charAt(0).charCodeAt()
      const last = node.raw.charAt(node.raw.length - 1).charCodeAt()

      if ((first === 12300 && last === 12301) || // 「」
        (first === 8216 && last === 8217)) { // ‘’
        state.write(`'${node.raw.slice(1, node.raw.length - 1)}'`)
      } else if ((first === 12302 && last === 12303) || // 『』
        (first === 8220 && last === 8221)) { // “”
        state.write(`"${node.raw.slice(1, node.raw.length - 1)}"`)
      } else if ((first === 34 && last === 34) ||
        (first === 39 && last === 39)) { // "" or ''
        state.write(node.raw)
      } else { // HaLang-specific string literals
        state.write(node.value)
      }
    } else if (node.regex != null) {
      this.RegExpLiteral(node, state)
    } else {
      state.write(JSON.stringify(node.value))
    }
  }
})

export default customGenerator
