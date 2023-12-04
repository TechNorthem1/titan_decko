import styled from "styled-components";

interface StyledStickyProps {
  fixed: boolean;
  fixedOn: number;
  componentHeight: number;
  componentPosition: number;
}

const StyledSticky = styled.div<StyledStickyProps>`
  left: 0;
  right: 0;
  z-index: 99;
  transition: all 250ms ease-in-out;
  top: 0;
  position: ${(props) => (props.fixed ? "sticky" : "sticky")};

  & + .section-after-sticky {
    padding-top: ${(props) => (props.fixed ? `${props.componentHeight}px` : "inherit")};
  }
`;

export default StyledSticky;
