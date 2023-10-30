"use client";
import styled from "styled-components";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  space,
  SpaceProps,
} from "styled-system";
import { shadowOptions } from "interfaces";
import { theme } from "@utils/theme";

interface TableRowProps extends SpaceProps, ColorProps, BorderProps {
  boxShadow?: shadowOptions;
}

const TableRow = styled.div<TableRowProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-radius: 10px;
  background: ${theme.colors.body.paper};
  box-shadow: ${({ theme, boxShadow }) => theme.shadows[boxShadow || "small"]};

  & > * {
    flex: 1 1 0;
  }

  .pre {
    white-space: pre;
  }

  ${space}
  ${color}
  ${border}
`;

export default TableRow;
