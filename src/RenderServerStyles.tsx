import * as React from 'react'
import { CSSFactory } from 'oncss'

const ServerStyleTags = () => {
    return Array.from(CSSFactory.values()).map((c, idx) => <style
        key={c.classname + idx}
        data-oncss={c.classname}
        dangerouslySetInnerHTML={{ __html: c.css }}
    />)
}

export default ServerStyleTags