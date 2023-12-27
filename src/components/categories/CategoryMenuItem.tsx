"use client"
import { FC } from "react";
import Link from "next/link";
import Icon from "@component/icon/Icon";
import { StyledCategoryMenuItem } from "./styles";

// ===============================================================
type CategoryMenuItemProps = {
  href?: string|any;
  title?: string;
  caret?: boolean;
  children?: any;
  icon?: any;
};
// ===============================================================

const CategoryMenuItem: FC<CategoryMenuItemProps> = (props) => {
  const { href, title, caret = true, children = [] } = props;

  return (
    <StyledCategoryMenuItem>
      <Link href={href}>
        <div className="category-dropdown-link">
          <span className="title">{title}</span>
          {caret && <Icon variant="small">chevron-right</Icon>}
        </div>
      </Link>

      {children}
    </StyledCategoryMenuItem>
  );
};

export default CategoryMenuItem;
