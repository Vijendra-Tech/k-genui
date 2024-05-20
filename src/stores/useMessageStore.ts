import { create, StateCreator } from 'zustand'

export type MessageSlice = {
  messages: any
  setMessages: (newMessages: any) => void
  featureFlag: string
  setFeatureFlag: (newFeatureFlag: string) => void,
  problemStatement: string,
  setProblemStatement: (newProblemStatement: string) => void,
  hideTextArea: boolean,
  setHideTextArea: (newHideTextArea: boolean) => void,
  imgSrcs: string[],
  setImgsSrcs: (newImgSrcs: string[]) => void
}

const createMessageSlice: StateCreator<MessageSlice> = set => ({
  messages: [],
  setMessages: newMessages => set(() => ({ messages: newMessages })),
  featureFlag: "v2",
  setFeatureFlag: newFeatureFlag => set(() => ({ featureFlag: newFeatureFlag })),
  problemStatement: "",
  setProblemStatement: newProblemStatement => set(() => ({ problemStatement: newProblemStatement })),
  hideTextArea: false,
  setHideTextArea: newHideTextArea => set(() => ({ hideTextArea: newHideTextArea })),
  imgSrcs: [],
  setImgsSrcs: newImgSrcs => set(() => ({ imgSrcs: newImgSrcs }))
})

export const useMessageStore = create<MessageSlice>((...a) => ({
  ...createMessageSlice(...a)
}))
