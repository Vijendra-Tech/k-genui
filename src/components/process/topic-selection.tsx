import { TopicTypes, topics, topics2 } from './data/topics'
import { Button } from '../ui/button'
import { useMessageStore } from '../../stores/useMessageStore'
import { nanoid } from 'nanoid'
import BotMessage from '../bot-message'
import SlidesGrid from './slide-grid'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import UserMessage from '../user-message'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import PushPinIcon from '@mui/icons-material/PushPin'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import VerticalTabs from '../vertical-tabs'
import { cn } from '../../lib/utils'
import {
  addInternalTopic,
  db,
  saveExternalTopics,
  saveInternalTopics
} from '../../models/db'
import Cookie from 'js-cookie'
import { useLiveQuery } from 'dexie-react-hooks'
import { TOPIC_GENERATION_BASE_URL } from '../../utils/constants'

function TopicSelection() {
  const messages = useMessageStore(state => state.messages)
  const featureFlag = useMessageStore(state => state.featureFlag)
  const setMessages = useMessageStore(state => state.setMessages)
  const [inttopicList, setTopics] = useState(() => topics)
  const [exrTopics, setExtTopics] = useState(() => topics2)

  const [chatId, _] = useState(() => localStorage.getItem('newChatId'))
  const user = Cookie.get('email')

  const internalTopics = useLiveQuery(() => {
    return db.internalTopics
  }, [])

  useEffect(() => {
    ;(async () => {
      console.log('internalTopics', internalTopics)

      if (chatId && user && !internalTopics) {
        await saveInternalTopics(user, JSON.parse(chatId), topics)
        await saveExternalTopics(user, JSON.parse(chatId), topics2)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const response = await fetch(TOPIC_GENERATION_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          stepId: 1,
          query: messages
        })
      }).then(res => res.json())

      if (response) {
        console.log('response', response)
      }
    })()
  }, [])

  const TopicList = ({
    topicList,
    setTopics
  }: {
    topicList: TopicTypes[]
    setTopics: Dispatch<SetStateAction<TopicTypes[]>>
  }) => {
    const [newTopic, setNewTopic] = useState('')
    return (
      <>
        {topicList.map(topic => (
          <div key={topic.id} className="flex gap-2 px-2 py-2 w-full h-full">
            {!topic.isNew && (
              <div className="flex justify-start gap-2">
                {topic.mode === 'selected' ? (
                  <span
                    role="button"
                    onClick={() => {
                      setTopics(prev =>
                        prev.map(t => {
                          if (t.id === topic.id && t.mode === 'selected') {
                            return { ...t, mode: 'existed' }
                          } else if (
                            t.id === topic.id &&
                            t.mode === 'existed'
                          ) {
                            return { ...t, mode: 'selected' }
                          }
                          return t
                        })
                      )
                    }}
                  >
                    <PushPinIcon className="cursor-pointer text-white bg-primary rounded-full w-2 h-2" />
                  </span>
                ) : (
                  <span
                    role="button"
                    onClick={() => {
                      setTopics(prev =>
                        prev.map(t => {
                          if (t.id === topic.id && t.mode === 'existed') {
                            return { ...t, mode: 'selected' }
                          } else if (
                            t.id === topic.id &&
                            t.mode === 'selected'
                          ) {
                            return { ...t, mode: 'existed' }
                          }
                          return t
                        })
                      )
                    }}
                  >
                    <PushPinIcon className="cursor-pointer rotate-45 text-purple-500   border border-purple-700 rounded-full" />
                  </span>
                )}
              </div>
            )}
            <Button
              variant={'outline'}
              className={cn('hover:bg-primary hover:text-white', {
                'bg-primary text-white': topic.mode === 'selected'
              })}
              onClick={() => {
                if (!topic.isNew) {
                  setTopics(prev =>
                    prev.map(t => {
                      if (t.id === topic.id && t.mode === 'selected') {
                        return { ...t, mode: 'existed' }
                      } else if (t.id === topic.id && t.mode === 'existed') {
                        return { ...t, mode: 'selected' }
                      }
                      return t
                    })
                  )
                }
              }}
            >
              {topic.name}
            </Button>

            {topic.isNew && (
              <span
                role="button"
                onClick={() => {
                  setTopics(prev => prev.filter(t => t.id !== topic.id))
                }}
              >
                <RemoveCircleOutlineIcon className=" text-purple-700 rounded-full cursor-pointer" />
              </span>
            )}
          </div>
        ))}
        <div className="flex gap-2 justify-start">
          <AddCircleOutlineIcon className="cursor-pointer" />
          <p>Add more</p>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault()

            setTopics(prev => [
              ...prev,
              {
                id: nanoid(),
                name: newTopic,
                mode: 'selected',
                isNew: true
              }
            ])
            setNewTopic('')

            addInternalTopic(
              //@ts-ignore
              user,
              chatId,
              newTopic
            )
          }}
        >
          <div className="flex gap-2">
            <Input
              placeholder="Enter topic name"
              className="bg-white"
              onChange={e => {
                setNewTopic(e.target.value)
              }}
              value={newTopic}
              required
            />
            <Button type="submit">Add</Button>
          </div>
        </form>
      </>
    )
  }

  return (
    <div className="bg-muted rounded-2xl px-4 py-5 flex flex-col gap-4 max-h-[500px] overflow-auto">
      <VerticalTabs
        FistComp={<TopicList topicList={inttopicList} setTopics={setTopics} />}
        SecondComp={
          <TopicList topicList={exrTopics} setTopics={setExtTopics} />
        }
      />

      <div className="flex  justify-end">
        {featureFlag === 'v1' && (
          <Button
            onClick={() => {
              setMessages([
                ...messages,
                {
                  id: nanoid(),
                  display: (
                    <UserMessage>
                      <div>User Selected topic</div>
                    </UserMessage>
                  )
                },
                {
                  id: nanoid,
                  display: (
                    <BotMessage content="">
                      <SlidesGrid />
                    </BotMessage>
                  )
                }
              ])
            }}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}

export default TopicSelection
