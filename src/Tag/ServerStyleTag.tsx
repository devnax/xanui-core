import { CSSFactoryType } from 'oncss'
import React from 'react'

const ServerStyleTag = ({ factory }: { factory: CSSFactoryType }) => {
   if (typeof window === 'undefined') {
      return <style
         dangerouslySetInnerHTML={{ __html: factory.css }}
         precedence={factory.classname}
         href={factory.classname}
      />
   }
   return null
}

export default ServerStyleTag
