import sketch from 'sketch'
import values from './lib/values'

export default () => {
  const doc = sketch.getSelectedDocument()
  const colors = doc.swatches

  if (!colors.length) {
    sketch.UI.alert('No Colors', 'There is no colors!')
    return
  }

  const formattedColors = colors.reduce(
    (prev, color) => ({
      ...prev,
      [color.name.replace('Colors/', '').toLowerCase()]: color.color,
    }),
    {}
  )

  let type = 'JSON'
  let savePanel = NSSavePanel.savePanel()

  savePanel.setNameFieldStringValue('colors.' + values[type].filetype)
  savePanel.setPrompt('Save')

  savePanel.runModal()

  let file = NSString.stringWithString(JSON.stringify(formattedColors))
  let file_path = savePanel.URL().path()
  file.writeToFile_atomically_encoding_error(
    file_path,
    true,
    NSUTF8StringEncoding,
    null
  )

  sketch.UI.alert('Colors exported', 'Colors exporte succesfully!')
}
