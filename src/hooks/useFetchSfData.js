import { useEffect, useState } from "react";
import { transform,CMP_API_LIMIT,CMP_SOQL_SERIES_LIMIT } from "../helpers/reportFactory";
import Sf from "../helpers/sf";


export const useFetchSfData = ( metadataItem) => {
    const [state, setState] = useState({
        error:{},
        data:{},
        loading:true
    });
    const {thresholds,limit,dynamicLimit,dynamicLabel,aggByName,fixLabel,fixLimit,mapLimit,series,reduceRules,soql,tooling,component} = metadataItem;
    useEffect(() => {
        setState({
            error:{},
            data:{},
            loading:true
        });
        if (component === CMP_API_LIMIT){
            const data=(Sf.getApiLimitsData());
            setState({data:transform({data,metadataItem}),loading:false});
        }else if (component === CMP_SOQL_SERIES_LIMIT){
            Sf.querySeries({ series, tooling })
            .then((data) => {
                setState({data:transform({data,metadataItem}),loading:false});
            })
            .catch((e)=>{
                setState({data:{},error:e,loading:false});
            });
        }else{
            Sf.query({ soql, tooling })
            .then((data) => {
                setState({data:transform({data,metadataItem}),loading:false});
            })
            .catch((e)=>{
                setState({data:{},error:e,loading:false});
            });
        }
        
    }, [thresholds,limit,dynamicLimit,dynamicLabel,aggByName,fixLabel,fixLimit,mapLimit,reduceRules,soql,series, tooling, component])
    return state;
}
