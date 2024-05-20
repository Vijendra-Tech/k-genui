import React, { RefObject } from 'react'
import { load, thumbnailPreviews } from '../../utils/misc'
import { useMessageStore } from '../../stores/useMessageStore'

export const useImageSrcs = (
  ref: RefObject<HTMLDivElement>,
  slides: number[]
) => {
  let srcs: Array<string> = []
   const setImgsSrcs = useMessageStore(state => state.setImgsSrcs)
  React.useEffect(() => {
    const container = ref?.current
    let PSPDFKit: any
    ;(async () => {
      PSPDFKit = await import('pspdfkit')
        .then(module => module.default)
        .catch(err => {
          console.log('loading error', err)
        })
      PSPDFKit?.unload(container) // Ensure that there's only one PSPDFKit instance.
      const instance = await load({
        document: '/generated_presentation.pptx',
        container,
        baseUrl: `${window.location.protocol}//${window.location.host}/${
          import.meta.env.PUBLIC_URL ?? ''
        }`,
        licenseKey:
          '1b1rI6g9qIdEjrRNSlPWYCTTpNg0-4O4V9vtj_vcmRkf_2lVKaoLdLzrM0oCZJTiEQYWppsfGWuY9RKJDIKACXhHpIzpnT-SyX4pPP7gsbFqZXIJaxkqa0PkCuR3ZaAUdJbK0J6OAfJAFgrXacFSgScuoh3SP5-gyF_KqkBk8hkbBh7dKzU7Br8v2ppCV7kbjJ9sOiXaJSF001w'
      })

      console.log('links:', slides)

      srcs = await thumbnailPreviews(instance, slides)
      console.log('srcs', srcs)
      setImgsSrcs(srcs)
      return () => PSPDFKit && PSPDFKit.unload(container)
    })()
  }, [ref, slides])

  return { srcs }
}
