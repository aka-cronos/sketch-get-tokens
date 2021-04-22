import sketch from 'sketch'

export default () => {
  const doc = sketch.getSelectedDocument()
  const textStyles = doc.sharedTextStyles

  if (!textStyles.length) {
    sketch.UI.alert('No Text Styles', 'There are no text styles!')
  } else {
    const formattedTokens = textStyles.reduce(
      (prev, textStyle) => ({
        ...prev,
        [textStyle.name.toLowerCase().replace(/\s/g, '-')]: {
          color: textStyle.style.textColor,
          size: textStyle.style.fontSize,
        },
      }),
      {}
    )

    console.log(formattedTokens)

    const type = 'json'
    const savePanel = NSSavePanel.savePanel()

    savePanel.setNameFieldStringValue('text-styles.' + type)
    savePanel.setPrompt('Save')

    savePanel.runModal()

    const file = NSString.stringWithString(
      JSON.stringify(formattedTokens, null, 2)
    )
    const filePath = savePanel.URL().path()
    file.writeToFile_atomically_encoding_error(
      filePath,
      true,
      NSUTF8StringEncoding,
      null
    )
    sketch.UI.alert('Text Styles exported', 'Text styles exported succesfully!')
  }
}
