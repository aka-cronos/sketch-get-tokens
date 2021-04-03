import sketch from 'sketch'

export default function() {
  const doc = sketch.getSelectedDocument()
  const colors = doc.swatches

  const colorsNames = colors.map(color => {
    return color.name
  })

  if (colors.length === 0) {
    sketch.UI.alert('No Colors', 'There is no colors!')
  } else {
    sketch.UI.alert('Color Variables', `${colorsNames}`)
  }
}