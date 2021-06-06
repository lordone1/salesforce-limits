
import React from 'react'
import { useFetchSfData } from '../hooks/useFetchSfData'
import { ProgressElement } from './ProgressElement';
import { Spinner } from '@patternfly/react-core';
import { ExpandableCard } from './ExpandableCard';
import { PieElement } from './PieElement';
import { isEmpty, STATUS_ERROR } from '../helpers/utils';

export const ChartReport = (metadataItem) => {
    const {thresholds}=metadataItem;
    const {data:{rows,chart,status},loading,error}=useFetchSfData({...metadataItem});
    return (
        <>
        <ExpandableCard {...metadataItem} status={!isEmpty(error)?STATUS_ERROR:status} hasStatus isExpanded={false}>
        {loading && <Spinner isSVG />}
        {!loading && rows.map(({title,currentValue,limit}) => (<ProgressElement key={title} title={title} 
                                                                    currentValue={currentValue} 
                                                                    limit={limit} 
                                                                    thresholds={thresholds}/>))}
        {!loading && <PieElement data={chart} />}
        </ExpandableCard>
        </>
    )
}
