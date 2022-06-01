import React, { useContext, useEffect, useState } from "react";

import { getAllData } from "./components/helpers/apiCalls";

const DataContext = React.createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    getAllData().then((res) => {
      setData(res.data);
      setIsLoading(false);
      setAuthenticated(res.data.authenticated);
    });
  }, []);

  return (
    <DataContext.Provider value={{ data, isLoading, authenticated }}>
      {children}
    </DataContext.Provider>
  );
};
