import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'

function ReactDocViewer() {
  // Step 2: Create an array of documents
  const docs = [
    {
      uri: `${window.location.protocol}//${window.location.host}/${
          import.meta.env.PUBLIC_URL ?? ''
        }/generated_presentation.pptx`,
      fileType:
        'pptx'
    } // Replace with your local PPT file path
  ]

  return (
    // Step 3: Use the DocViewer component
    <DocViewer
      pluginRenderers={DocViewerRenderers}
      documents={docs}
    //   className="w-80 h-80"
      initialActiveDocument={docs[0]}
      language="en"
      style={{ width: '100%', height: '78vh' }}
    />
  )
}

export default ReactDocViewer
