import { useLocalStorageState } from 'ahooks';
import { createContext, useState } from "react";

export interface Like {
  likeList: string[];
  updateLikeList: (value: string[]) => void;
}

export const LikeContext = createContext<Like>(null as any);

export const LikeContextProvider = ({ children }: any) => {
  const [localList = [], setLocalList] = useLocalStorageState<string[]>('like_list', { defaultValue: [] })
  const [likeList, setValue] = useState(localList);
  const updateLikeList = (newValue: string[]) => {
    setValue(newValue);
    setLocalList(newValue)
  };
  const contextValue = {
    likeList,
    updateLikeList,
  };

  return <LikeContext.Provider value={contextValue}>{children}</LikeContext.Provider>;
};