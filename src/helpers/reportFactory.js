import { ChartReport } from "../components/ChartReport";
import { ProgressListReport } from "../components/ProgressListReport"
import { SectionReport } from "../components/SectionReport";
import { STATUS_DANGER, STATUS_SUCCESS, STATUS_WARNING } from "./utils";
export const CMP_SECTION='section';
export const CMP_SOQL_SINGLE_LIMIT='soql-single-limit';
export const CMP_SOQL_AGG_LIMIT='soql-aggregate-limit';
export const CMP_SOQL_FLEXIBLE_LIMIT='soql-flexible-limit';
export const CMP_API_LIMIT='api-limit';
export const CMP_SOQL_SERIES_LIMIT='soql-series-limit'
export const CMPS=[CMP_SECTION,CMP_SOQL_SINGLE_LIMIT,CMP_SOQL_AGG_LIMIT,CMP_API_LIMIT,CMP_SOQL_SERIES_LIMIT,CMP_SOQL_FLEXIBLE_LIMIT,''];
export const buildReport = ({id,edit,metadataItem,setMetadata}) => {
    const component = metadataItem?.component;
    switch (component) {
        case CMP_SECTION:
            return <SectionReport key={id} edit={edit} setMetadata={setMetadata} {...metadataItem}/>
        case CMP_SOQL_FLEXIBLE_LIMIT:
        case CMP_SOQL_AGG_LIMIT:
        case CMP_SOQL_SINGLE_LIMIT:
        case CMP_API_LIMIT:
            return <ProgressListReport key={id} edit={edit} setMetadata={setMetadata} {...metadataItem}/>
        case CMP_SOQL_SERIES_LIMIT:
            return <ChartReport key={id} edit={edit} setMetadata={setMetadata} {...metadataItem}/>
        default:
            break;
    }
    
}

export const transform=({data,metadataItem})=>{
    if (data){
        const component = metadataItem?.component;
        switch (component) {
            case CMP_SOQL_SINGLE_LIMIT:
                return transformCountSoql({data,metadataItem});
            case CMP_SOQL_AGG_LIMIT:
                return transformAggSoqlQuery({data,metadataItem});
            case CMP_SOQL_FLEXIBLE_LIMIT:
                    return transformFlexibleSoqlLimit({data,metadataItem});
            case CMP_API_LIMIT:
                return transformApiLimit({data,metadataItem});
            case CMP_SOQL_SERIES_LIMIT:
                return transformSeries({data,metadataItem});
            default:
                break;
        }
    }else{
        return [];
    }
    
}
const getStatus=({thresholds,limit,currentValue})=>{
    let perc=currentValue/limit*100
    if (perc>=thresholds.success[0] && perc<=thresholds.success[1]){
        return STATUS_SUCCESS
    }else if (perc>=thresholds.warning[0] && perc<=thresholds.warning[1]){
        return STATUS_WARNING
    }else if(perc>=thresholds.danger[0] && perc<=thresholds.danger[1]){
        return STATUS_DANGER
    }else{
        return 'na'
    }
}
const transformCountSoql = ({data,metadataItem:{title,thresholds,limit}})=>{
    const currentValue=data.totalSize;
    const status =getStatus({thresholds,limit,currentValue});
    return {status:status,rows:[{title:title,limit:limit,currentValue:currentValue,status:status}]};
}
const transformAggSoqlQuery=({data,metadataItem:{title,thresholds,limit,aggByName}})=>{
    let rows=aggregateBy({rows:data.records,id:aggByName});
    let toRet=mapAndGetStatus({thresholds,rows,fLabel:'key',fValue:'value',absoluteLimit:limit});
    return toRet;
};
const transformFlexibleSoqlLimit=({data,metadataItem:{dynamicLabel,fixLabel,dynamicLimit,fixLimit,mapLimit,thresholds,reduceRules}})=>{
    let warning=false;
    let danger=false;
    const rows=data.records.map((e)=>{
        const value=reduce(e,reduceRules);
        const label=dynamicLabel?e[dynamicLabel]:fixLabel;
        const limit=dynamicLimit?e[dynamicLimit]:mapLimit?mapLimit[label]:fixLimit;
        const status=getStatus({thresholds,limit,currentValue:value});
        
        if (status === 'warning'){
            warning=true;
        }else if(status === 'danger'){
            danger=true;
        }
        return {title:label,limit,currentValue:value,status};
    });
    return {rows:rows,status:danger?'danger':warning?'warning':'success'}
};
const transformApiLimit=({data,metadataItem:{thresholds,limit,title}})=>{
    const{Max,Remaining}=data[limit];
    const currentValue=Max-Remaining;
    const status=getStatus({thresholds,limit:Max,currentValue:currentValue});
    return {status:status,rows:[{title,limit:Max,currentValue:currentValue,status:status}]}
};
const transformSeries=({data,metadataItem:{title,limit,thresholds}})=>{
    const tot=data.reduce((p,{data:{totalSize}})=>(p+totalSize),0);
    const status =getStatus({thresholds,limit,currentValue:tot});
    const chart =data.map(({data:{totalSize},label})=>{return{x:label , y:totalSize}});
    const toRet={rows:[{title,limit,currentValue:tot,status}],status:status,chart:chart};
    return toRet;
}
const reduce=(e,cfg)=>{
    return cfg.fields.length === 1?e[cfg.fields[0]]:cfg.fields.reduce((a,c)=>{
        if (cfg.operation === "-"){
            return e[a]-e[c];
        }else if (cfg.operation === "+"){
            return e[a]+e[c];
        }
        else if (cfg.operation === "*"){
            return e[a]*e[c];
        }
        else if (cfg.operation === "/"){
            return e[a]/e[c];
        }else{
            return 0;
        }
    });
}
const mapAndGetStatus=({thresholds,limit,rows,fLabel,fValue,absoluteLimit})=>{
    let warning=false;
    let danger=false;
    
    let rowsMap=rows.map((e)=>{
        let l=absoluteLimit?absoluteLimit:limit[e[fLabel]];
        let status=getStatus({thresholds,limit:l,currentValue:e[fValue]});
        if (status === 'warning'){
            warning=true;
        }else if(status === 'danger'){
            danger=true;
        }
        return {title:e[fLabel],limit:l,currentValue:e[fValue],status:status}}
        );
    return {rows:rowsMap,status:danger?'danger':warning?'warning':'success'};
}
const aggregateBy=({rows,id})=>{
    let hash={};
    let toRet=[];
    rows.forEach((el)=>{
        if (hash[el[id]]){
            hash[el[id]]+=1;
        }else{
            hash[el[id]]=1;
        }
    });
    for (const [key, value] of Object.entries(hash)) {
        toRet.push({key:key,value:value});
    }
    return toRet;
}