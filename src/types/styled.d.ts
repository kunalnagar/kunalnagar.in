// eslint-disable-next-line no-restricted-imports
import 'styled-components'
import { IColors } from '../theme/colors'
import { ISpacing } from '../theme/spacing'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  export interface DefaultTheme {
    breakpoint: string[]
    colors: IColors
    spacing: ISpacing
  }
}
