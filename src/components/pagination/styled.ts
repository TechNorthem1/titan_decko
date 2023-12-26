import styled from "styled-components";
import { color, space } from "styled-system";
import { getTheme } from "@utils/utils";
import { colors } from "@utils/themeColors";

export const StyledPagination = styled.div`
  .pagination {
    margin: 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    list-style-type: none;
    padding: 0px;

    li {
      cursor: pointer;

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        width: 32px;
        margin: 0px 5px;
        border-radius: 5px;
        outline: none;
        border: 1px solid #6f6d6d;
        border-radius: 50%;
        color: #6f6d6d !important;
        @media only screen and (max-width: 450px) {
          margin: 4px;
        }
      }

      &:not(.active):hover {
        a {
          color: ${colors.titan.dark} important;
          border: 1px solid ${colors.titan.dark};
        }
      }
    }

    .active {
      cursor: none;
      a {
        border: 1px solid ${colors.titan.dark};
        color: ${colors.titan.dark} !important;
      }
    }

    .disabled {
      .control-button {
        cursor: none;
        border: 1px solid ${colors.titan.dark};
        color: ${colors.titan.dark};
      }
    }
  }

  .control-button {
    height: 32px;
    width: 32px;
    min-width: 32px;
    border: 1px solid ${colors.titan.dark};
    color: ${colors.titan.dark};
  }

  ${space}
`;
