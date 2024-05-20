import React, { Suspense } from 'react'
import { load, thumbnailPreviews } from '../utils/misc'

const SlideImageContainer = React.forwardRef((props, ref) => {
  const [imgSrcs, setImgSrcs] = React.useState<any>([])
  //@ts-ignore
  const { slideIndex } = props
  React.useEffect(() => {
    //@ts-ignore
    const container = ref?.current
    setImgSrcs([])

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
    //   const src = await thumbailPreview(instance, slideIndex)
     
     console.log('links:', slideIndex);
     
      const srcs = await thumbnailPreviews(instance, slideIndex)
      console.log('srcs', srcs)
      setImgSrcs(srcs)
      //@ts-ignore
      return () => PSPDFKit && PSPDFKit.unload(container)
    })()
  }, [ref, slideIndex])
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div
          //@ts-ignore
          ref={ref}
          style={{ width: '100%', height: '50vh' }}
          className="hidden"
        ></div>
        {imgSrcs?.length > 0 ? (
            <>
            {
                imgSrcs.map((src:any, index:number) => {
                    return (
                      <div className="w-60 h-40 shadow-md border-gray-400 my-5 mx-5 flex justify-center items-center" key={index}>
                        <img
                          key={index}
                          src={src}
                          alt="slide"
                          width={'100%'}
                          height={'100vh'}
                        />
                      </div>
                    )
                })
            
            }
            </>
        ) : (
          'loading...'
        )}
      </Suspense>
    </>
  )
})

export default SlideImageContainer
