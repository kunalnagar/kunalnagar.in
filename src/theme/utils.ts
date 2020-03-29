import { ESize, EThemeProperty } from './enums'
import { theme } from '.'

export const getThemePropertyBySize = (
  property: EThemeProperty,
  size: ESize
) => {
  return theme[property][size]
}
