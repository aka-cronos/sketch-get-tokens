import sketch from 'sketch'
import values from './lib/values'

export default () => {
  const doc = sketch.getSelectedDocument()
  const colors = doc.swatches

  if (!colors.length) {
    sketch.UI.alert('No Colors', 'There is no colors!')
  } else {
    const formattedColors = colors.reduce(
      (prev, color) => ({
        ...prev,
        [color.name.toLowerCase()]: color.color,
      }),
      {}
    )

    let type = 'json'
    let savePanel = NSSavePanel.savePanel()

    savePanel.setNameFieldStringValue('colors.' + type)
    savePanel.setPrompt('Save')

    savePanel.runModal()

    let file = NSString.stringWithString(
      JSON.stringify(formattedColors, null, 2)
    )
    let file_path = savePanel.URL().path()
    file.writeToFile_atomically_encoding_error(
      file_path,
      true,
      NSUTF8StringEncoding,
      null
    )

    sketch.UI.alert('Colors exported', 'Colors exporte succesfully!')
  }
}
