"use client";
import { FC } from "react";
import ReactPaginate from "react-paginate";
import { SpaceProps } from "styled-system";
import Icon from "../icon/Icon";
import { Button } from "../buttons";
import { StyledPagination } from "./styled";

export interface PaginationProps extends SpaceProps {
  pageCount: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  onChange?: (data: number) => void;
  pagination?:number;
  setPage?:any;
  getProduct?:any;
}

const Pagination: FC<PaginationProps> = ({
  onChange,
  pageCount,
  pageRangeDisplayed,
  marginPagesDisplayed,
  pagination,
  setPage,
  getProduct,
  ...props
}) => {
  const handlePageChange = async (page: any) => {
    if (onChange) onChange(page.selected);
    setPage(page.selected+1);
    getProduct();
  };

  const PREVIOUS_BUTTON = (
    <Button
      height="auto"
      padding="6px"
      color="primary"
      overflow="hidden"
      borderRadius="50%"
      className="control-button"
    >
      <Icon defaultcolor="currentColor" variant="small">
        chevron-left
      </Icon>
    </Button>
  );

  const NEXT_BUTTON = (
    <Button
      height="auto"
      padding="6px"
      color="primary"
      overflow="hidden"
      borderRadius="50%"
      className="control-button"
    >
      <Icon defaultcolor="currentColor" variant="small">
        chevron-right
      </Icon>
    </Button>
  );

  const BREAK_LABEL = (
    <Icon defaultcolor="currentColor" variant="small">
      triple-dot
    </Icon>
  );

  return (
    <StyledPagination {...props}>
      <ReactPaginate
        pageCount={Number(pageCount)}
        nextLabel={NEXT_BUTTON}
        breakLabel={BREAK_LABEL}
        activeClassName="active"
        disabledClassName="disabled"
        containerClassName="pagination"
        previousLabel={PREVIOUS_BUTTON}
        onPageChange={handlePageChange}
        // pageRangeDisplayed={pageRangeDisplayed}
        // marginPagesDisplayed={marginPagesDisplayed}
      />
    </StyledPagination>
  );
};

export default Pagination;
