import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'

function PPTViewer({ docs = [] }: { docs?: any }) {
  //  const docs = [
  //    { uri: require('./example-files/pdf.pdf') } // Local File
  //  ]
  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
}

export default PPTViewer
