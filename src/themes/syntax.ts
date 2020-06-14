import Colors from '../interface/colors'
import { TokenColor } from '../interface'
import * as data from './themeData.json'
// import { cloneDeep } from '../utils/cloneDeep'
import { uniqBy } from '../utils/uniqBy'

export default function (configuration) {

  let result: TokenColor[] = data.tokenColors.default

  if (configuration.bold) {
    result = uniqBy([...data.tokenColors.bold, ...result], setting => {
      return setting.name + setting.scope
    }) as TokenColor[]
  }
  if (configuration.italic) {
    result = uniqBy([...data.tokenColors.italic, ...result], setting => {
      return setting.name + setting.scope
    }) as TokenColor[]
  }

  // Fill in color placeholders with concrete color values
  const colorObj: Colors = configuration.vivid ? data.textColors.vivid : data.textColors.classic
  result.forEach(token => {
    if (token.settings.foreground) {
      if (token.settings.foreground in colorObj) { token.settings.foreground = colorObj[token.settings.foreground] }
    }
  });

  return {
    semanticTokenColors: {
      enumMember: {
        foreground: colorObj.fountainBlue
      },
      'variable.constant': {
        foreground: colorObj.whiskey
      },
      'variable.defaultLibrary': {
        foreground: colorObj.chalky
      }
    },
    tokenColors: result
  }
}
