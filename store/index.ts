import { create } from 'zustand'

type State = {
    url: string;
};
  
type Action = {
    setUrl: (url: State['url']) => void;
};

const useStore = create<State & Action>((set) => ({
    // initial states
    url: '',

    // functions
    setUrl: (url) => set(() => ({ url: url }))
}));
  
export default useStore;