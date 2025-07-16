import { create } from 'zustand'

type modalState = {
    resizeModalState: boolean,
    aiModalState: boolean,
    effectsModalState: boolean,
    overlayModalState: boolean,

    url: string,
    // queryParams: string,
    transformUrl: string,
};
  
type modalAction = {
    openResizeModal: () => void;
    openAiModal: () => void;
    openEffectsModal: () => void;
    openOverlayModal: () => void;

    closeResizeModal: () => void;
    closeAiModal: () => void;
    closeEffectsModal: () => void;
    closeOverlayModal: () => void;

    setUrl: (url: modalState['url']) => void;
    // setQueryParams: (queryParams: modalState['queryParams']) => void;
    setTransformUrl: (transformUrl: modalState['transformUrl']) => void;
};

const useModalStore = create<modalState & modalAction>((set) => ({
    // initial states
    resizeModalState: false,
    aiModalState: false,
    effectsModalState: false,
    overlayModalState: false,

    url: "",
    // queryParams: "",
    transformUrl: "", 

    // functions
    openResizeModal: () => set(() => ({resizeModalState: true})),
    closeResizeModal: () => set(() => ({resizeModalState: false})),

    openAiModal: () => set(() => ({aiModalState: true})),
    closeAiModal: () => set(() => ({aiModalState: false})),

    openEffectsModal: () => set(() => ({effectsModalState: true})),
    closeEffectsModal: () => set(() => ({effectsModalState: false})),

    openOverlayModal: () => set(() => ({overlayModalState: true})),
    closeOverlayModal: () => set(() => ({overlayModalState: false})),

    setUrl: (url) => set(() => ({url: url})),
    // setQueryParams: (queryParams) => set(() => ({queryParams: queryParams})),
    setTransformUrl: (transformUrl) => set(() => ({transformUrl: transformUrl}))
}));
  
export default useModalStore;