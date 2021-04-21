import sketch from 'sketch'

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

    const type = 'json'
    const savePanel = NSSavePanel.savePanel()

    savePanel.setNameFieldStringValue('colors.' + type)
    savePanel.setPrompt('Save')

    savePanel.runModal()

    const file = NSString.stringWithString(
      JSON.stringify(formattedColors, null, 2)
    )
    const filePath = savePanel.URL().path()
    file.writeToFile_atomically_encoding_error(
      filePath,
      true,
      NSUTF8StringEncoding,
      null
    )

    sketch.UI.alert('Colors exported', 'Colors exporte succesfully!')
  }
}
