
import React from 'react'
import { useFetchSfData } from '../hooks/useFetchSfData'
import { ProgressElement } from './ProgressElement';
import { Spinner} from '@patternfly/react-core';
import { ExpandableCard } from './ExpandableCard';
import { isEmpty, STATUS_ERROR } from '../helpers/utils';


export const ProgressListReport = (metadataItem) => {
    const {thresholds}=metadataItem;
    const {data:{rows,status},loading,error}=useFetchSfData({...metadataItem});
    return (
        <>
        <ExpandableCard {...metadataItem} status={!isEmpty(error)?STATUS_ERROR:status} hasStatus isExpanded={false}>
        {loading && <Spinner isSVG />}
        {!loading && error && <div>{JSON.stringify(error)}</div>}
        {!loading && !error && rows.map(({title,currentValue,limit}) => (<ProgressElement key={title} title={title} 
                                                                    currentValue={currentValue} 
                                                                    limit={limit} 
                                                                    thresholds={thresholds}/>))}
        </ExpandableCard>
        </>
    )
}
