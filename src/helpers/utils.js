export const STATUS_WARNING='warning';
export const STATUS_SUCCESS='success';
export const STATUS_DANGER='danger';
export const STATUS_ERROR='error';
export const LIMIT_FIX='Fix limit';
export const LIMIT_DYNAMIC='From Soql';
export const LIMIT_MAP='Map Limit';
export const LABEL_FIX='Fix label';
export const LABEL_DYNAMIC='From Soql';

export const stopPropagation= (e)=>{
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
}

export const filterData = (data, id) => {
    var r = data.filter(function (i) {
        if (i.items) i.items = filterData(i.items, id);
        return i.id !== id
    })
    return JSON.parse(JSON.stringify(r));
}
export const isEmpty=(obj)=>{
    return !(obj && Object.keys(obj).length !== 0)
}
export const findAndModifyById=(data,newData)=>{
    return data.map((e)=>{
        let items;
        if (e.items){
            items=findAndModifyById(e.items,newData);
        }
        if (e.id == newData.id){        
            e= newData
        }
        if (items){
            e.items=items;
        }
        return e;
        
        
    });
}
export const findAndAddById=(data,newData,id)=>{
    if (id===0){
        data.push(newData);
        return data;
    }
    return data.map((e)=>{
        let items;
        if (e.items){
            items=findAndAddById(e.items,newData,id);
        }
        if (items){
            e.items=items;
        }
        if (e.id == id){        
            e.items.push(newData);
        }
        
        return e;      
    });
}

export const generateId=()=>{
    return Math.round(Math.random()*10000000)
}