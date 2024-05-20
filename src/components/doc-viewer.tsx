
//@ts-nocheck
import { useEffect, useRef } from 'react'
import { load } from '../utils/misc';

function DocViewer(props: { document: string }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current // This `useRef` instance will render the PDF.

    console.log('Dialog called');
    

    let PSPDFKit, instance;
    (async function () {
      PSPDFKit = await import('pspdfkit')
        .then(module => module.default)
        .catch(err => {
          console.log('loading error', err)
        })

      PSPDFKit?.unload(container) // Ensure that there's only one PSPDFKit instance.

      instance = await load({
        container,
        // The document to open.
        document: props.document,
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        baseUrl: `${window.location.protocol}//${window.location.host}/${
          import.meta.env.PUBLIC_URL ?? ''
        }`,
        licenseKey:
          '1b1rI6g9qIdEjrRNSlPWYCTTpNg0-4O4V9vtj_vcmRkf_2lVKaoLdLzrM0oCZJTiEQYWppsfGWuY9RKJDIKACXhHpIzpnT-SyX4pPP7gsbFqZXIJaxkqa0PkCuR3ZaAUdJbK0J6OAfJAFgrXacFSgScuoh3SP5-gyF_KqkBk8hkbBh7dKzU7Br8v2ppCV7kbjJ9sOiXaJSF001w'
      })
    })()

    return () => PSPDFKit && PSPDFKit.unload(container)
  }, [props.document])

  // This div element will render the document to the DOM.
  return <div ref={containerRef} style={{ width: '100%', height: '50vh' }} />
}

export default DocViewer
