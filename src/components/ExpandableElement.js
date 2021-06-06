import { ExpandableSection } from '@patternfly/react-core';
import React, { useState } from 'react'

export const ExpandableElement = ({expanded,title,children}) => {
    const [isExpanded, setexpanded] = useState(true);
    const onToggle=()=>{
        setexpanded((e)=>(!e));
    }
    return (
            <ExpandableSection
                toggleText={title}
                onToggle={onToggle}
                isExpanded={isExpanded}
            >
            {children}
            </ExpandableSection>
    );
}
