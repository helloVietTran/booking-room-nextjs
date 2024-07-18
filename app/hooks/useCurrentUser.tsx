import { create } from "zustand"

interface User{
    id: number;
    userName: string;
    email: string;
    bio: string;
    avatarUrl: string;
    createdAt?: string;
}
interface CurrentUserProps {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const useCurrentUser = create<CurrentUserProps>((set) => ({
   user: null,
   login: (user) => set({ user }),
   logout: () => set({ user: null })
}));

export default useCurrentUser;
  