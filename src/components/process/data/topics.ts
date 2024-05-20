export type TopicTypes = {
  id: string | number,
  name: string,
  mode?: string,
  isNew?:boolean
}

export const topics: TopicTypes[] = [
  {
    id: 1,
    name: 'Select Topic 1 for more information',
    mode: 'selected',
    isNew: false
  },
  {
    id: 2,
    name: 'Topic 2',
    mode: 'selected',
    isNew: false
  },
  {
    id: 3,
    name: 'Topic 3',
    mode: 'selected',
    isNew: false
  }
]

export const topics2: TopicTypes[] = [
  {
    id: 1,
    name: 'Externala Topic 1',
    mode: 'selected',
    isNew: false
  },
  {
    id: 2,
    name: 'Topic 2',
    mode: 'selected',
    isNew: false
  },
]
