import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction
} from "react";

interface ContextType {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  liked: number;
  setLiked: Dispatch<SetStateAction<number>>;
  likedIds: number[];
  setLikedIds: Dispatch<SetStateAction<number[]>>;
}

export const Context = createContext<ContextType>({} as ContextType);

export const GlobalContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [likedIds, setLikedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem("likedIds");
    return saved ? JSON.parse(saved) : [];
  });

  const [liked, setLiked] = useState<number>(() => {
    const saved = localStorage.getItem("liked");
    return saved ? Number(saved) : likedIds.length;
  });

  useEffect(() => {
    localStorage.setItem("likedIds", JSON.stringify(likedIds));
    localStorage.setItem("liked", String(likedIds.length));
    setLiked(likedIds.length);
  }, [likedIds]);

  const [token, setToken] = useState<string>(() => localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <Context.Provider value={{ token, setToken, liked, setLiked, likedIds, setLikedIds }}>
      {children}
    </Context.Provider>
  );
};
