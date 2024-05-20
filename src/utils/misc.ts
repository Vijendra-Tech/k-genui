//@ts-nocheck

import PSPDFKit from 'pspdfkit'

export type PSPDFKitConfiguration = {
  container: HTMLElement
  document: string
  baseUrl: string
  licenseKey: string
}

export type PSPDFKitInstance = {
  unload: () => void
}

export async function load(defaultConfiguration: any) {
  const toolbarItems = [
    { type: 'zoom-out' },
    { type: 'zoom-in' },
    { type: 'print' },
    { type: 'export-pdf' }
  ]

  if (defaultConfiguration.documentId && defaultConfiguration.instant) {
    toolbarItems.splice(9, 0, { type: 'comment' })
  }

  const instance = await PSPDFKit.load({
    ...defaultConfiguration,
    initialViewState: PSPDFKit.viewStateFromOpenParameters(
      new PSPDFKit.ViewState({ showToolbar: false })
    )
  })
  console.log('PSPDFKit for Web successfully loaded!!', instance)
  return instance
}

export async function thumbailPreview(instance: any, slide: number) {
  const src = await instance.renderPageAsImageURL(
    { width: 700 * window.devicePixelRatio },
    slide
  )

  if (src) {
    return src
  } else {
    return ''
  }
}

export async function thumbnailPreviews(instance: any, slides: number[]) {
  const srcs = await Promise.all(
    slides.map(async slide => {
      return await instance.renderPageAsImageURL(
        { width: 700 * window.devicePixelRatio },
        slide
      )
    })
  )
  return srcs
}
let globalSetIsServer:any
export async function loadPSPDFKit(defaultConfiguration: any) {
  if (defaultConfiguration.authPayload) {
    globalSetIsServer && globalSetIsServer(true)

    return
  }

  globalSetIsServer && globalSetIsServer(false)

  const toolbarItems:any = [
    // defaultConfiguration?.toolbarItems[0],
    // defaultConfiguration?.toolbarItems[1],
    // defaultConfiguration?.toolbarItems[2]
  ]

  const instance = await PSPDFKit.load(
    {
      ...defaultConfiguration,
      enableHistory: true,
      toolbarItems
    },
    //@ts-expect-error
    []
  )
  instance.setToolbarItems(items => {
    function downloadDocument(url:string, fileName:string) {
      const a = document.createElement('a')

      a.href = url
      a.style.display = 'none'
      a.download = fileName
      a.setAttribute('download', fileName)

      const body = document.body

      if (body) {
        body.appendChild(a)
        a.click()

        return () => {
          const body = document.body

          if (body) {
            body.removeChild(a)
          }
        }
      } else {
        return () => {}
      }
    }

    async function exportOffice(format:any) {
      const buffer = await instance.exportOffice({ format })

      if (!buffer) {
        return
      }

      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })

      const fileName = `document.${format}`

      const objectUrl = window.URL.createObjectURL(blob)
      downloadDocument(objectUrl, fileName)
      window.URL.revokeObjectURL(objectUrl)
    }

    // items.push(
    //   {
    //     type: 'custom',
    //     id: 'export-office-word',
    //     title: 'Export Word',
    //     onPress: () => exportOffice('docx')
    //   },
    //   {
    //     type: 'custom',
    //     id: 'export-office-powerpoint',
    //     title: 'Export PowerPoint',
    //     onPress: () => exportOffice('pptx')
    //   },
    //   {
    //     type: 'custom',
    //     id: 'export-office-excel',
    //     title: 'Export Excel',
    //     onPress: () => exportOffice('xlsx')
    //   }
    // )

    return items
  })

  console.log('PSPDFKit for Web successfully loaded!!', instance)
}

