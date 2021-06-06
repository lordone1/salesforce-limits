/*global chrome*/
const Sf = {
    apiVersion:'51.0',
    getApiLimitsData(){
        return this.apiLimitData;
    },
    async init(){
        const urlParams = new URLSearchParams(window.location.search);
        const sfHost = urlParams.get('host');
        await this.getSession(sfHost);
        this.apiLimitData=await this.getLimitsEndpointInfo();
    },
    async getSession(sfHost) {
        let message = await new Promise(resolve =>
        chrome.runtime.sendMessage({ message: "getSession", sfHost }, resolve));
        if (message) {
            this.host = message.hostname;
            this.sid = message.key;
        }
    },
    async querySeries({ series, tooling }){
        const aggData = await Promise.all(series.map(async ({soql,label,tooling}) => {
            const data=await Sf.rest(`services/data/v${Sf.apiVersion}/${tooling ? 'tooling/' : ''}query/?q=${encodeURIComponent(soql)}&cache=${Math.random()}`);
            return {data,label}
        }));
        return aggData;
    },
    async query({ soql, tooling }){
        const data = await Sf.rest(`services/data/v${Sf.apiVersion}/${tooling ? 'tooling/' : ''}query/?q=${encodeURIComponent(soql)}&cache=${Math.random()}`);
        return data;
    },
    async rest(url){
        const resp = await fetch(`https://${Sf.host}/${url}`,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json; charset=UTF-8',
                'Authorization':`Bearer ${Sf.sid}`
              }
        });
        if (resp.ok === false){
            const error  = await resp.json();
            throw error;
        }
        const data  = await resp.json();
        return data;
    },
    async getLimitsEndpointInfo(){
        return await Sf.rest(`services/data/v${Sf.apiVersion}/limits?cache=${Math.random()}`);
    }
}

export default Sf;



