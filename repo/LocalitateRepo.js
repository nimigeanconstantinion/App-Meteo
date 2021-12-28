import { data } from "../localitati.js";
import { Localitate } from "../model/Localitate.js";
class LocalitateRepo{

    constructor() {
        this.localitate ="";
        this.judet = "";
        this.obLoca = {};
    }
    
    getJudete = () => {
        console.log(data);
        let judete=new Set();
        data.forEach(e=>{
            judete.add(e.judet);
        })
        
        this.listaJud = Array.from(judete).sort();
        return this.listaJud;
    }
    getAllLocaJud = (judet) => {
        this.listaLoca = data.filter(x => x.judet === judet).map(a=>a.nume).sort();
        return this.listaLoca;
    }
    
    getObjLoca = (localitate,judet) => {
        let oloc = data.filter(a => a.nume === localitate && a.judet === judet)[0];
        console.log(oloc);
        let ob = new Localitate(oloc.nume, oloc.judet, oloc.lat, oloc.lng);
        return ob;
    }


}

export { LocalitateRepo };