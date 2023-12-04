
import Box from "@component/Box";
import api from "@utils/__api__/grocery-2";
import Categories from "@utils/__api__/categories";
import Productos from "@utils/__api__/productos";
import { Footer1 } from "@component/footer";
import Wrapper from "@sections/categorias/Wrapper";
import Section1 from "@sections/categorias/Section1";
import Section2 from "@sections/categorias/Section2";
import Section3 from "@sections/categorias/Section3";
import Section4 from "@sections/categorias/Section4";
import Section6 from "@sections/categorias/Section6";
import Section9 from "@sections/categorias/Section9";
import SidenavBar from "@sections/categorias/SidenavBar";


const GroceryTwo = async ({params}) => {
  const serviceList = await api.getServices();
  const categories = await Categories.getCategories(`products/categories?parent=${params.id}&per_page=6`);
  const {products} = await Productos.getProductsByCategories(`products?category=${params.id}&order=desc&orderby=price&per_page=9`);
  const dairyProducts = await api.getDairyProducts();
  const navigationList = await api.getNavigationList();
  const mainCarouselData = await api.getMainCarousel();
  const featuredProducts = await api.getFeaturedProducts();
  const bestHomeProducts = await api.getBestHomeProducts();
  const bestSellProducts = await api.getBestSellProducts();
  const discountBanners = await api.getDiscountBannerList();

  return (
    <Wrapper>
      {/* SIDEBAR NAVIGATION AREA */}
      <Box className="sidenav" pt="1.5rem">
        <SidenavBar isFixedNave={true} navList={navigationList} />
      </Box>

      <Box className="content" pt="1.5rem">
        {/* HERO CAROUSEL AREA */}
        <Section1 carouselData={mainCarouselData} />

        {/* SERVICES AREA */}
        <Box mb="3rem" overflow="hidden">
          <Section2 services={serviceList} />
        </Box>

        {/* SHOP BY CATEGORY AREA */}
        <Box mb="3rem">
          <Section3 categories={categories} />
        </Box>
        
        {/* FEATURED PRODUCTS AREA */}
        <Box mb="3rem">
          <Section4 title="Elementos Destacados" products={products} params={params}/>
        </Box>

        {/* BEST SELLER PRODUCTS AREA */}
        {/* <Box mb="3rem">
          <Section4
            title="El mas vendido en su area"
            products={bestSellProducts}
          />
        </Box> */}

        {/* DISCOUNT BANNER CAROUSEL AREA */}
        {/* <Box mb="3rem">
          <Section6 cardList={discountBanners} />
        </Box> */}

        {/* BEST HOME PRODUCTS AREA */}
        {/* <Box mb="3rem">
          <Section4
            title="Lo mejor de lo esencial para el hogar"
            products={bestHomeProducts}
          />
        </Box> */}

        {/* SNACK AND DRINKS PRODUCTS AREA */}
        {/* <Box mb="3rem">
          <Section4
            title="Aperitivos, bebidas, lácteos y más"
            products={dairyProducts}
          />
        </Box> */}

        {/* FOOTER AREA */}
        <Footer1 />
      </Box>
    </Wrapper>
  );
};

export default GroceryTwo;
