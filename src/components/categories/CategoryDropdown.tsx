import { FC } from "react";
import navigations from "@data/navigations";
import MegaMenu1 from "./mega-menu/MegaMenu1";
import MegaMenu2 from "./mega-menu/MegaMenu2";
import CategoryMenuItem from "./CategoryMenuItem";
import { StyledCategoryDropdown } from "./styles";

// =========================================
type CategoryDropdownProps = {
  open: boolean;
  position?: "absolute" | "relative";
  categories:any[]
};
// =========================================

const CategoryDropdown: FC<CategoryDropdownProps> = ({
  open,
  position = "absolute",
  categories = []
}) => {
  const megaMenu: any = { MegaMenu1, MegaMenu2 };

  return (
    <StyledCategoryDropdown open={open} position={position}>
      {categories.map((item) => {
        // let MegaMenu = megaMenu[item.menuComponent];
        return (
          <CategoryMenuItem
            key={item.id}
            href={`/categorias/${item.id}`}
            title={item.name}
            caret={false}
          >
            {/* <MegaMenu data={item.name || {}} /> */}
          </CategoryMenuItem>
        );
      })}
    </StyledCategoryDropdown>
  );
};

export default CategoryDropdown;
