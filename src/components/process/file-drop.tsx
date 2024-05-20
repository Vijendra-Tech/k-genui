//@ts-nocheck
import { useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'
import { useMessageStore } from '../../stores/useMessageStore'
import { nanoid } from 'nanoid'
import BotMessage from '../bot-message'
import GenerateStoryLine from './generate-storyline'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'

function FileDrop() {
  const messages = useMessageStore(state => state.messages)
  const setMessages = useMessageStore(state => state.setMessages)
  const featureFlag = useMessageStore(state => state.featureFlag)
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        '.ppt': [],
        '.pptx': []
      }
    })
  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ))

  return (
    <div className="rounded-2xl bg-muted flex flex-col gap-3 px-4 py-5">
      <section className=" flex rounded-full w-64 h-64 justify-center items-center px-10 py-10 border-dashed border-2 border-indigo-600 cursor-pointer bg-white">
        <div {...getRootProps({ className: 'dropzone' })} className='flex flex-col items-center'>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(Only *.ppt and *.pptx files will be accepted)</em>
          <DriveFolderUploadIcon className="text-indigo-600 w-52 h-32"/>
        </div>
      </section>
      <div className="flex justify-end">
        {featureFlag === 'v1' && (
          <Button
            variant={'default'}
            onClick={() => {
              setMessages([
                ...messages,
                {
                  id: nanoid,
                  display: (
                    <BotMessage content={''}>
                      <GenerateStoryLine />
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

export default FileDrop
