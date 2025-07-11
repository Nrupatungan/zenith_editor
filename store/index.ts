import { create } from 'zustand'

type modalState = {
    resizeModalState: boolean,
    aiModalState: boolean,
    effectsModalState: boolean,
    overlayModalState: boolean
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
};

const useModalStore = create<modalState & modalAction>((set) => ({
    // initial states
    resizeModalState: false,
    aiModalState: false,
    effectsModalState: false,
    overlayModalState: false,

    // functions
    openResizeModal: () => set(() => ({resizeModalState: true})),
    closeResizeModal: () => set(() => ({resizeModalState: false})),

    openAiModal: () => set(() => ({aiModalState: true})),
    closeAiModal: () => set(() => ({aiModalState: false})),

    openEffectsModal: () => set(() => ({effectsModalState: true})),
    closeEffectsModal: () => set(() => ({effectsModalState: false})),

    openOverlayModal: () => set(() => ({overlayModalState: true})),
    closeOverlayModal: () => set(() => ({overlayModalState: false})),
}));
  
export default useModalStore;