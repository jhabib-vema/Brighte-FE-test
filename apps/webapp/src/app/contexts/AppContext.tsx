import { ApiClient } from '../client/ApiClient';
import { createContext, ReactNode, useContext, useMemo } from 'react';

export interface AppContextProps {
  apiClient: ApiClient;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const useAppContext = () => {
  return useContext(AppContext);
};

export type AppContextProviderProps = {
  children: ReactNode;
};

// Inject App Context where Config is required
export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const apiClient = useMemo(() => ApiClient.withDeps(), []);
  const value = useMemo(() => {
    return {
      apiClient,
    };
  }, [apiClient]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
