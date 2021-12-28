import { data } from "./localitati.js";
import { Localitate } from "./model/Localitate.js";
import { LocalitateRepo } from "./repo/LocalitateRepo.js";
class Home{
    constructor() {
        this.listaJud = [];
        this.listaLoca = [];
        this.localitateRepo = new LocalitateRepo();
        this.listaJud = this.localitateRepo.getJudete();
        
        this.body = document.querySelector("body");

        this.main = document.createElement("main");

        this.container = document.createElement("div");
        this.container.className = "container";

        this.main.appendChild(this.container);
        this.body.appendChild(this.container);        
        this.createMain();

        this.body.addEventListener("change", (e) => {
            this.bodyChange(e);
        })
    }
  
    mkListaJudete = () => {
        let divjud = document.createElement("div");
        divjud.id = "divjud";
        divjud.name = "divjud";
        let label = document.createElement("label");
        label.for = "divjud";
        label.textContent = "Alegeti un judet";
        let ob = document.createElement("select");
        ob.id = "seljud";
        let opt = "";
        this.listaJud.forEach(element => {
            opt = document.createElement("option");
            opt.textContent = element;
            ob.appendChild(opt);
        });
        divjud.appendChild(label);
        divjud.appendChild(ob);
        return divjud;

    }
    mkListaLocalitati = (judet) => {
        let divloc = document.createElement("div");
        divloc.id = "divloc";
        let label = document.createElement("label");
        label.textContent = "Alegeti o localitate";
        let ob = document.createElement("select");
        ob.id = "selloca";
        let listaLocalitati = this.localitateRepo.getAllLocaJud(judet);
        let opt = "";
        listaLocalitati.forEach(element => {
            opt = document.createElement("option");
            opt.textContent= element;
            ob.appendChild(opt);
        });
        divloc.appendChild(label);
        divloc.appendChild(ob);
        return divloc;

        
    }

    getImgWeather = (lat,long) => {
        let urll = `http://www.7timer.info/bin/civil.php?lon=${long}&lat=${lat}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`;
        fetch(urll).then(e => {
          console.log(e.url);
        this.mkimg(e.url);
        })
    }

    mkimg = (imgURL) => {
        let img = document.createElement("img");
        img.id = "vremea";
        img.src = imgURL;
        this.container.appendChild(img);
    }
    createMain = () => {

        let a = document.querySelector("body");
        let sel = this.mkListaJudete();
        this.container.appendChild(sel);
        
        let sell = this.mkListaLocalitati("");
        this.container.appendChild(sell);


    }

    bodyChange = (e) => {
     
        let obs = e.target.id;
        let slj = document.querySelector("#seljud");
        let sll = document.querySelector("#selloca");
        let divloc = document.querySelector("#divloc");
        console.log(obs);
        switch (true) {

            case obs == "seljud":
                slj = document.querySelector("#seljud");
                sll = document.querySelector("#selloca");
                let img = document.querySelector("#vremea");
                let divloc = document.querySelector("#divloc");

                console.log("ksdlkms dkldkdl");
                let is=typeof img;
                if (img !== null) {
                    console.log("sunt in ");
                    console.log(img);
                    this.container.removeChild(img);
                    
                }
                if (divloc!==null) {
                    this.container.removeChild(divloc);
                    
                }
                let j = slj.options[slj.selectedIndex].textContent;
                //let l = sll.options[sll.selectedIndex].textContent;                
                console.log("judetul este " + j);
                this.container.appendChild(this.mkListaLocalitati(j));
                
                break;
            case obs == "selloca":
                let uj = slj.options[slj.selectedIndex].textContent;
                let ul = sll.options[sll.selectedIndex].textContent;
               
                img = document.querySelector("#vremea");

                if (img !== null) {
                    this.container.removeChild(img);
                }

                let obLoca = new Localitate();
                obLoca = this.localitateRepo.getObjLoca(ul, uj);
                this.getImgWeather(obLoca.latitudine, obLoca.longitudine);
                break;

        }
    }

}
export { Home };