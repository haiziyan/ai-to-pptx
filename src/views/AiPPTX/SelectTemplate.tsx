import { useState, useEffect, useCallback } from 'react'
import { BackendApi } from './Config'

export default function SelectTemplate({token, nextStep}: { token: string, nextStep: (id: string) => void}) {
    const [templateId, setTemplateId] = useState('')
    const [templates, setTemplates] = useState([] as any)

    const loadTemplates = useCallback(async () => {
        const url = BackendApi + 'randomTemplates.php'
        const resp = await (await fetch(url, {
            method: 'POST',
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ page: 1, size: 28, filters: { type: 1 } })
        })).json()
        if (resp.code != 0) {
            alert('Get template error: ' + resp.message)

            return
        }
        setTemplates(resp.data || [])
        selectTemplate(resp.data[0])
    }, [token])

    const selectTemplate = useCallback((template: any) => {
        setTemplateId(template.id)
    }, [token])

    useEffect(() => {
        loadTemplates()
    }, [])

    return (
      <>
        <div className="template_content">
            <div>---- Set Style ----</div>
            <div className="but_div">
                <button onClick={() => {
                    nextStep(templateId)
                }}>Next: Generate PPT</button>
            </div>
            {/*<div className="template_div">
                {templates.map((template: any) => (
                    <div className={template.id == templateId ? 'template template_select' : 'template'} key={template.id} onClick={() => selectTemplate(template)}>
                        <img src={BackendApi + "json/" + template.subject + ".png"} />
                    </div>
                ))}
                { templates.length == 0 && <div>Templates loading...</div> }
            </div>*/}
        </div>
      </>
    )
}
