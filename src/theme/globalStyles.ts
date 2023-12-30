import { createGlobalStyle } from "styled-components";
import { colors } from "@utils/themeColors";

const GlobalStyles = createGlobalStyle`
  :root{
    --salmon: #FF5D5D;
    --black: #000000;
    --white: white;
    --yellow: #FFCF00;
    --green: #25D366;
    --yellow-light: #FFEB94;
    --blue: #3861FF;
    --gray: #CFCFCF;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 1.5;
    transition: all 0.50s linear;
    color: ${({ theme }) => theme.colors.body.text};
    background: #f5f5f5;
    /* font-family: Open Sans, Roboto, -apple-system, BlinkMacSystemFont, Segoe UI,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif; */
    
  }

  body::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  body::-webkit-scrollbar:vertical {
    width:7px;
  }

  body::-webkit-scrollbar-button:increment,
  body::-webkit-scrollbar-button {
    display: none;
  }

  body::-webkit-scrollbar:horizontal {
    height: 10px;
  }

  body::-webkit-scrollbar-thumb {
    background-color: var(--black);
  }

  body::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  html {
    font-size: 16px;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.body.text};
  }

  .cursor-pointer {
    cursor: pointer;
  }

#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: 1031;
  position: fixed;
  overflow: hidden;
  border-radius: 0px 4px 4px 0px;
  background: ${({ theme }) => theme.colors.primary.main};
}

/* Fancy blur effect */
#nprogress .peg {
  right: 0px;
  width: 100px;
  height: 100%;
  display: block;
  position: absolute;
  box-shadow: 0 0 10px ${({ theme }: any) =>
    theme.colors.primary.main}, 0 0 5px ${({ theme }: any) =>
  theme.colors.primary.main};
  opacity: 1.0;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  top: 15px;
  right: 15px;
  z-index: 1031;
  display: block;
  position: fixed;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border-radius: 50%;
  border: solid 2px transparent;
  border-top-color: ${({ theme }) => theme.colors.primary.main};
  border-left-color: ${({ theme }) => theme.colors.primary.main};

  -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

.category-dropdown-link:hover {
  background-color: ${colors.titan.yellow};
  color: ${colors.titan.dark};
  font-weight: 600;
}

.title-product {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.title-product a {
  display: block;
  text-align: right;
  color: var(--black);
  text-transform: capitalize;
  transition: .3s ease all;
  font-size: 16px;
  font-weight: 600;
}

.title-product a:hover{
  color: var(--salmon);
  text-shadow: 0 0 1px var(--gray);
}

.dEQOgl{
  position: sticky;
  margin-top: 80px
}

.css-1nmdiq5-menu{
  z-index: 9999 !important;
}

@-webkit-keyframes nprogress-spinner {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes nprogress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.eTtGGD {
  margin-top: 80px;
}

.Box-sc-19ecb654-0.Card-sc-c8d26b2e-0.ProductCard9__Wrapper-sc-6b174472-0.bHFmVr.fNEeJc.iInYUD {
  border-radius: 0.5rem;
}

.blnLUZ {
  border-radius: 0; 
}

select#searchByPrice {
  width: 100%;
  padding: 8px;
  appearance: none;
  border-radius: 3px;
  outline: none;
}

.euBaoC + .section-after-sticky {
  padding-top: inherit;
  margin-top: 6rem;
}

.bwtVwD + .section-after-sticky {
  padding-top: 20px !important;
}


`;

export default GlobalStyles;
