import { configureFonts, DefaultTheme } from 'react-native-paper'
import customFonts from "./Fonts"

const theme = {
    ...DefaultTheme,
    fonts: configureFonts(customFonts),
    roundness: 4,
    colors: {
        ...DefaultTheme.colors,
        primary: '#6200EE',
        accent: '#03DAC6',
        primaryVariant: 'orange',
        accentVariant: 'pink',
    }
}

export default theme