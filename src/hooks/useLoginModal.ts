import {create} from "zustand"

interface LoginStore {
    isOpen: boolean
    open: () => void
    close: () => void
}

const useLoginModal = create<LoginStore>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),
}))

export default useLoginModal