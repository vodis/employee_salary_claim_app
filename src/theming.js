import { createContext } from 'react';

export const darkTheme = {
  colors: {
    background: '#21242A',
    text: '#ffffff',
    textSecondary: '#B2B6C2',
    primary: '#23acde',
    primaryDarker: '#22a5d3',
    secondary: '#ff4500',
    border: '2px solid #4F638E',
    buttonText: '#929EDA',
    buttonBackground: '#2D3340',
    buttonConnectedText: '#a8afcb',
    backgroundSelected: '#323641',
    secondLineBackground: '#292e33',
    secondLineWrapperBackground: '#292e33',
    brightness: '100%',
    brightnessHover: '200%',
    secondBackground: '#292e33',
    buttonClaimColor: '#23acde',
    buttonClaimTextColor: '#ffffff',
    buttonClaimHoverColor: '#1734c7',
    buttonClaimDisabledColor: '#6c757d',
    buttonClaimDisabledTextColor: '#fff',
    borderRefColor: '#7a7979'
  },
  background: {
    background: 'linear-gradient(180deg, #2C304F 0%, #252836 100%)'
  }
};

export const lightTheme = {
  colors: {
    background: '#ffffff',
    text: '#000000',
    textSecondary: '#636775',
    primary: '#23acde',
    primaryDarker: '#23acde',
    secondary: '#ff6347',
    border: '2px solid #FFFFFF',
    buttonText: '#23acde',
    buttonBackground: '#E0E3F5',
    buttonConnectedText: '#636775',
    backgroundSelected: '#F4F4F4',
    secondLineBackground: 'rgba(33,37,41,0.001)',
    secondLineWrapperBackground: 'rgba(33,37,41,0.06)',
    brightness: '0%',
    secondBackground: '#F7F8FA',
    brightnessHover: '100%',
    buttonClaimColor: '#E0E3F5',
    buttonClaimTextColor: '#23acde',
    buttonClaimHoverColor: '#23acde',
    buttonClaimDisabledColor: '#E0E3F5',
    buttonClaimDisabledTextColor: '#8b9296',
    borderRefColor: '#cccccc'
  },
  background: {
    background: 'linear-gradient(180deg, #E5E7F5 0%, rgba(229, 231, 245, 0.3) 100%)'
  }
};

export const ThemeContext = createContext(darkTheme);
