import { Progress, ProgressVariant } from '@patternfly/react-core';
import React from 'react'

export const ProgressElement = ({title,currentValue,limit,thresholds}) => {
   
    const percent=currentValue/limit*100;
    const getVariant=()=>{
        if (percent>=thresholds.success[0] && percent<=thresholds.success[1]){
            return ProgressVariant.success;
        }else if (percent>=thresholds.warning[0] && percent<=thresholds.warning[1]){
            return ProgressVariant.warning;
        }else{
            return ProgressVariant.danger;
        }
    }
    return (
            <Progress value={percent} title={title} variant={getVariant()}/>
    )
}
