import { css } from "styled-components";

const breakpoints = {
  small: 24.15,
  medium: 33.75,
  large: 44.8
};

// Iterate through the sizes and create a media template
const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label]}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

const fontSizes = {
  pLineHeightMin: 1.4,
  pLineHeightMax: 1.3,
  pFontSizeMin: 0.8,
  pFontSizeMax: 0.9,
  titleLineHeightMin: 1.8,
  titleLineHeightMax: 1.3,
  titleFontSizeMin: 1,
  titleFontSizeMax: 1.2
};

export { breakpoints, media, fontSizes };
