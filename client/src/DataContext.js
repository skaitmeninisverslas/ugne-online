import React, { useContext, useEffect, useState } from "react";

import { getAllData } from "./components/helpers/apiCalls";

const DataContext = React.createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    getAllData().then((res) => {
      setData(res.data);
      setIsLoading(false);
      setAuthenticated(res.data.authenticated);
    });

    setUpdateData(false);
  }, [updateData]);

  return (
    <DataContext.Provider
      value={{ data, isLoading, authenticated, setUpdateData }}
    >
      {children}
    </DataContext.Provider>
  );
};
