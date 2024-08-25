import { Button } from '@mui/material'
import { PromptForm } from '../prompt-form'
import * as React from 'react'
import { NotepadText } from 'lucide-react'
import { CircleEllipsis } from 'lucide-react'

const randomSuggestions = [
  {
    header: 'Kearney Expertise',
    sub: 'Kearney is a global management consulting firm that focuses on strategic and operational CEO-agenda issues facing businesses, governments and institutions around the globe. As of 2021, Kearney has offices in more than 40 countries.'
  },
  {
    header: 'Keaney Qualifications',
    sub: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien'
  },
  {
    header: 'Stortline 3',
    sub: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien'
  },
  {
    header: 'Stortline 4',
    sub: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien'
  },
  {
    header: 'Stortline 5',
    sub: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien'
  },
  {
    header: 'Stortline 6',
    sub: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien'
  }
]

const fakeNetworkRequest = () => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve('Success')
    }, 2000)
  })
}

const AiAssistant = () => {
  const [input, setInput] = React.useState('')
  const [showContextMenu, setShowContextMenu] = React.useState(false)
  const [stortlines, setStorylines] = React.useState(randomSuggestions)
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '@') {
        setShowContextMenu(true)
      } else {
        setShowContextMenu(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleSubmit = async (e: any = undefined) => {
    e.preventDefault()
    if (input === 'Change context of Kearney Expertise') {
      //change context of Kearney Expertise
      const newStorylines = stortlines.map((suggestion, index) => {
        if (suggestion.header === 'Kearney Expertise') {
          return {
            header: 'Kearney Expertise',
            sub: 'Kearney is a global management consulting firm that focuses on strategic and operational CEO-agenda issues facing businesses. As of 2021, Kearney has offices in more than 40 countries.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien'
          }
        }
        return suggestion
      })
      setLoading(true)
      await fakeNetworkRequest()
      setStorylines(newStorylines)
      setInput('')
      setLoading(false)
    }
    if (input === 'Remove Kearney Expertise') {
      //remove Kearney Expertise
      const newStorylines = stortlines.filter(
        (suggestion, index) => suggestion.header !== 'Kearney Expertise'
      )
      setLoading(true)
      await fakeNetworkRequest()
      setStorylines(newStorylines)
      setInput('')
      setLoading(false)
    }
    if (input === 'Add new context') {
      //add new context
      const newStorylines = [
        ...stortlines,
        {
          header: 'New Context',
          sub: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien'
        }
      ]
      setLoading(true)
      await fakeNetworkRequest()
      setStorylines(newStorylines)
      setInput('')
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col gap-1 h-screen justify-center items-center">
      <h1 className="text-4xl font-bold">AI Assistant</h1>
      <p className="text-lg font-bold   ">View Storyline</p>
      {loading && (
        <div className="bg-purple-400 dark:bg-gray-800 rounded-lg shadow-md p-4 w-96 animate-pulse text-white text-center">
          Loading...
        </div>
      )}
      <div className="grid grid-cols-2 gap-1 mx-auto ">
        {stortlines.map((suggestion, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-96"
          >
            <h1 className="text-lg font-semibold">{suggestion.header}</h1>
            <p>{suggestion.sub}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-3">
        <Button variant="contained">Generate</Button>
      </div>
      <div className="fixed inset-x-0 bg-white/90 bottom-0 w-full duration-300 ease-in-out peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] dark:from-10%">
        <div className="mx-auto sm:max-w-xl sm:px-4">
          <div className="relative grid gap-4 sm:pb-4">
            {showContextMenu && (
              <div className="absolute bottom-full mb-2 bg-white border rounded shadow-md p-2">
                <ul>
                  <li
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onMouseEnter={() => {
                      setInput('Change context of Kearney Expertise')
                    }}
                    onMouseLeave={() => {
                      setInput('')
                    }}
                    onClick={() => {
                      setInput('Change context of Kearney Expertise')
                      setShowContextMenu(false)
                    }}
                  >
                    <div className="flex gap-1">
                      <NotepadText size={'20'} />
                      <p>Change context of Kearney Expertise</p>
                    </div>
                  </li>
                  <li
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onMouseEnter={() => {
                      setInput('Remove Kearney Expertise')
                    }}
                    onMouseLeave={() => {
                      setInput('')
                    }}
                    onClick={() => {
                      setInput('Remove Kearney Expertise')
                      setShowContextMenu(false)
                    }}
                  >
                    <div className="flex gap-1">
                      <NotepadText size={'20'} />
                      <p>Remove Kearney Expertise</p>
                    </div>
                  </li>
                  <li
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onMouseEnter={() => {
                      setInput('Add new context')
                    }}
                    onMouseLeave={() => {
                      setInput('')
                    }}
                    onClick={() => {
                      setInput('Add new context')
                      setShowContextMenu(false)
                    }}
                  >
                    <div className="flex gap-1">
                      <NotepadText size={'20'} />
                      <p> Add new context</p>
                    </div>
                  </li>
                  <li>
                    <div className="flex gap-1">
                      <CircleEllipsis size={'20'} className="text-purple-400" />
                      <p>More Options</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
            <PromptForm
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiAssistant
