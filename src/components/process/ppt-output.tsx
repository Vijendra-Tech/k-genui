import DocViewer from "../doc-viewer"

function PPTOutPut() {
  return (
    <div className="PDF-viewer">
      <DocViewer document={'generated_presentation.pptx'} />
    </div>
  )
}

export default PPTOutPut