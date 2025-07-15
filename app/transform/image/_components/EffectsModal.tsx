"use client"

import useModalStore from '@/store'
import { XIcon } from 'lucide-react';

import React from 'react'

const EffectsModal = () => {
    const {effectsModalState, closeEffectsModal} = useModalStore();

    if(!effectsModalState) return null;

    return (
        <div data-slot="dialog-portal"
        >
          <div
        data-state={effectsModalState ? "open" : "closed"}
        data-slot="dialog-overlay"
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/60"
        onClick={closeEffectsModal} // Added onClick event to close modal
      >
        <div
          data-slot="dialog-content"
          data-state={effectsModalState ? "open" : "closed"}
          className="bg-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[425px] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
              <button
                data-state={effectsModalState ? "open" : "closed"}
                className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                onClick={closeEffectsModal}
              >
                <XIcon />
                <span className="sr-only">Close</span>
              </button>
    
              <h2>Hello Effects</h2>
            </div>
          </div>
        </div>
      )
}

export default EffectsModal