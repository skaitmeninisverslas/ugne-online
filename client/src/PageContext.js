import React from "react";
import { Footer } from "./components/Footer";

import { Header } from "./components/Header";
import { useCategoriesData } from "./components/hooks/useCategoriesData";
import { useMenuData } from "./components/hooks/useMenuData";
import { usePagesData } from "./components/hooks/usePagesData";

export const PageContext = React.createContext();

export const PageProvider = ({ children }) => {
  const { menu } = useMenuData();
  const { categories } = useCategoriesData();
  const { pages } = usePagesData();

  return (
    <PageContext.Provider value={{ menu, categories, pages }}>
      <Header menu={menu} categories={categories} pages={pages} />
      {children}
      <Footer menu={menu} categories={categories} pages={pages} />
    </PageContext.Provider>
  );
};
