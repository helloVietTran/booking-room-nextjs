import { create } from "zustand"

interface UserEmailProps {
    email: string;
    setEmail: (email: string) => void;
}

const useEmail = create<UserEmailProps>((set) => ({
    email: '',
    setEmail: (email) => set({ email })
}));

export default useEmail;
  