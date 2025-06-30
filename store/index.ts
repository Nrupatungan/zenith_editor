import { create } from 'zustand'

type State = {
    url: string;
    fileId: string;
};
  
type Action = {
    setUrl: (url: State['url']) => void;
    setFileId: (fileId: State['fileId']) => void;
};

const useStore = create<State & Action>((set) => ({
    // initial states
    url: '',
    fileId: '',

    // functions
    setUrl: (url) => set(() => ({ url: url })),
    setFileId: (fileId) => set(() => ({fileId: fileId})),
}));
  
export default useStore;