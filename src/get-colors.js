import sketch from 'sketch'

export default function() {
  const doc = sketch.getSelectedDocument()
  const colors = doc.swatches

  // Get color names from variables
  const colorsNames = colors.map(color => {
    return color.name.toLowerCase()
  })

  console.log(colorsNames)
  
  // If color variables exist, show an alert with the color names
  if (colors.length !== 0) {
    sketch.UI.alert('Color Variables', `${colorsNames}`)
  } else {
    sketch.UI.alert('No Colors', 'There is no colors!')
  }
}