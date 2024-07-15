function Calculator() {
    /*
    Szükségünk van kép operand-ra, ezek a számok lesznek, meikkel müveleteket csinálunk, ezenkivül kell egy operator, ami megmondja, hogy milyen 
    müveletet hajtunk végre az operand-okkal!!! 
    currentValue, pedig az ami be van írva a display-be!!!! 
    Lesz még egy font-size is mert attól függően, hogy hány szán van beírva, attól függően lesz meghatározva a fontSize, mert ha sok szán van 
    akkor nem fog rendesen kiférni és kisebb, hogy legyen, tehát itt majd a currentValue-nak a length-jével fogunk dolgozni!!!!!  
    */
    const [operand1, setOperand1] = useState("");
    //ez lesz az első érték amit kiválasztunk 
    const [operand2, setOperand2] = useState("");
    //ez lesz a második érték 
    const [operator, setOperator] = useState("");
    //ez lesz, hogy milyen müvelet legyen összeadás, kivonás stb.
    const [currentValue, setCurrentValue] = useState("");
    //hogy mi van éppen beírva a display-be, jelenlegi érték!!!! 
    const [fontSize, setFontSize] = useState(25);
    //hogy mekkora legyen a font-ja, annak amit beírunk a display-be, 25-vel kezdünk, de ez kisebb lesz ha nem férne ki!!!  

    /*
    Lesz két segédfüggvény, az egyik azt nézi meg, hogy csak egy . lehet abban amit beírunk, tehát az operand-ban amit bekér 
    ez a checkComma és még lesz egy checkMinus, ami meg azt nézi meg, hogy csak egy minusz jel lehet az operand-ban!!!!!
    */
    const checkComma = (operand, num) => {
        /*
        ez bekér egy num-ot, az a szám, amire éppen kattintunk vagy ., az operand meg az egész 
        tehát a szám 1 vagy 2 vagy 3 vagy . stb. az operand meg az egész, hogy 234.33
        és ha ez num egy pont(.), akkor nem lehet az operand-nak a végén!!!!!! tehát nem lehet a .length-1-dik-en 
        meg az sem lehet, hogy ponttal kezdjünk, tehát a num az egy pont, akkor nem lehet az operand egy üres string!!!!! 
        */
        return num === "." && operand[operand1.length - 1] === "." || //ha az utolsó karakterre akarnánk pontot írni vagy 
            num === "." && operand === ""; //itt meg akkor akarunk pontot írni ha még nincsen semmi az operand-ban, első karakter lenne a "."  
    };

    const checkMinus = (num, operand) => {
        /*
        itt meg ha num egy "-", akkor fontos, hogy nem lehet még egy minusz benne, tehét ha num "-", akkor az includes-val a operand-ban 
        megnézzük, hogy van már egy "-" és ezt return-öljük 
        és majd meghívásnál megkapják az értékeket és rögtön csinálunk egy return-t, mert ami itt van return-ölve meg a checkComma-ában
        azok az esetek, amik nekünk nem lesznek jók!!!!
        */
        return num === "-" && operand.includes("-");
    }

    /*
    Ebben a függvényben, ami vár egy num-t, az a szám, amire rákattintunk vagy minusz jel vagy pont, azzal fogjuk set-elni az operand1-et
    meg az operand2-t 
    és amiket segédfüggvényeket csináltunk azoknak megadjuk a num-ot meg az operand-ot és ha azok igazak, akkor rögtön lesz egy return
    mert ezek az esetek nekünk nem jók!!!!! 
    Honnan tudjuk, hogy mikor van az operand1 meg az operand2
    -> 
    onnan, hogy megnézzük, hogy van-e már operator, mert ha nincs, akkor az biztos, hogy az operand1 lesz, ha meg van, akkor meg biztos, hogy 
    az operand2!!!!!! 
    */
    const numberClick = (num) => {
        if (operator === "") { //ha az operator értéke üres string, akkor biztos, hogy az operand1 lesz 
            if (checkComma(operand1, num) || checkMinus(operand1, num))
                return; //return ha a segédfüggvények true-k lesznek, tehát azt jelenti, hogy van hiba -> elmagyarazas.js
            /*
            ha meg minden rendben ment, akkor meg a jelenlegi num-ot hozzáadjuk az operand1-hez!!!! 
            tehát mindig az előző állapotához a operand1-nek hozzáadjuk a a num-ot -> prevOp=>prevOp+num
            */
            setOperand1(prevOp => prevOp + num)
        } else {
            //else tehát már van operator, ilyenkor kell majd az operand2-t set-elni, mert tudjuk, hogy operator után biztos, hogy az jön
            if (checkComma(operand2, num) || checkMinus(operand2, num))
                return; //segédfüggvényeket alakalmazva megnézzük az operand2-t és ha true az értéke akkor return
            setOperand2(prevOp => prevOp + num);
            //itt meg az operand2-t set-eljük mindig az előző érték plusz num, tehát a karakter, amit éppen kiválasztunkra

            /*
            és ami nagyon fontos, hogy ezt a numberClick-et mindig meg kell majd hívni a return-be az összes értéknél egy onClick-vel 
            hogy majd ez a függvény tudja, hogy pontosan mi lesz a num, amit itt bekér!!!!!!!!!! 
            */


            /*
            ugyanezt megcsináljuk az operator-ra, hogyha arra kattintunk, itt is majd minden operator-nál a return-ben meg kell hívni és megadni
            hogy mi lesz az operator, mert ez a függvény vár egy operator-t és majd azzal fogja set-elni a currentValue-t!!!!!!! 
            2 kikötés van 
            1. ha még nincsen meg az operand1, tehát annak az értéke egy üres string, akkor return 
            2. csak akkor tudunk operator-t választani, ha még nincsen, mert egy müveletben csak egy operator lehet!!!!! 
                és akkor ha meg van, akkor set-eljük a kiválasztott operator-val az operator useState-s változót és a currentValue-t 
                is frissítjük majd az operrátort megadva a prevValue-nak 
    
            Végül meghívjuk itt a calculate függvényt és megadjuk neki az opertor-t 
            */
        }
        const operatorClick = (op) => {//vár egy op-t, operatort, amit majd a return-ben meghívjuk minden olyan elemnél, ami operator és megadjuk 
            //ha nincs operand1, akkor nem lehet operator-t választani!!! 
            if (operand1 === "")
                return

            //ha nincsen még operator, akkor lehet választani egyet
            if (operator === "") {
                //frissítjük az operator useStates változót 
                setOperator(op);
                //value-nak megadjuk az eddigiekhez, ami ott van az operator-t 
                setCurrentValue(prevValue => prevValue + op);
            }
        }

        calculate(op);//a kiszámoláshoz meg kell, hogy mi az operator, ezért a calculate vár egy op-t, amit itt megadunk neki!!! 


        const calculate = (newOp) {
            /*
            mikor megyünk be ide, ha meg van az operand1 meg a 2 is!!!! és az operator is illetve az operand2 az nem .-val végződik
            és amit itt fogunk csinálni, hogy létrehozunk egy result lokális változót és majd ezzel fogjuk set-elni az operand1-et 
            ezzel az értékkel és utána még tudunk hozzáadni dolgokat, nem csak egy müveletet tudunk majd csinálni, hanem amennyit akarunk 
    
            Csinálunk egy switch-et az operator-ra, mert ettől fog függeni, hogy milyen müveletet csinálunk az operand1 és 2-vel 
    
            fontos, hogy parseFloat-olni kell a bekért dolgokat és úgy tudjuk majd megcsinálni a müveletet és utána a result is 
            egy number lesz, de viszont amikor frissítjük a operand1-et ezzel a result-val, akkor toString()-elni kell majd!!!! 
            */
            if (operand1 !== "" && operand2 !== "" && operator !== "" &&
                operand2[operand2.length - 1] !== ".") {
                //ha meg van mindennek az értéke és az operand2 nem "."-val végződik!!!! 

                /*
                az operator useState-s értékének megfelelően elvégezzük a müveletet, parseFloat!!!!, mert kell a tizedes is!!!!!!! 
                */
                let result;//ebbe fogjuk menteni az eredményt, attól függően, hogy milyen operator-t használunk 
                switch (operator) {
                    case "+":
                        result = parseFloat(operand1) + parseFloat(operand2);
                        break; //fontos a break, hogy ne menjünk tovább ha megtaláltuk a megfelelőt!!!!!!!!!!!!! 
                    case "-":
                        result = parseFloat(operand1) - parseFloat(operand2);
                        break;
                    case "*":
                        result = parseFloat(operand1) * parseFloat(operand2);
                        break;
                    case "/":
                        result = parseFloat(operand1) / parseFloat(operand2);
                        break;
                }

                //nagyon fontos, hogy itt mire állítjuk majd az értékeket 
                setOperand1(result.toString());
                //az operand1 a result lesz, hogy tovább tudjunk majd számolni és ez toString-elve
                setCurrentValue(result + newOp);
                //result és az új operator, amit majd bekérünk itt, fontos, hogy nem szabad összekeverni a sima op-vel!!!! 
                setOperand2("");
                //ez egy üres string, mert majd megadjuk az értéket ha tovább akarunk számolni!!!! 
                setOperator(newOp);
                //az új operator lesz, hogy tovább tudjunk számolni!!!!! 

            }
        };

        /*
        clear-vel meg minden kiűríünk és majd csinálunk egy button-t, aminek megadjuk ezt!!!! 
        */
        const clear = () => {
            setCurrentValue("");
            setOperand1("");
            setOperand2("");
            setOperator("");
        };

        /*
        csinálunk a currentValue változására egy useEffect-et és attól függően, hogy a currentValue.length az mekkora, tehát 
        milyen hosszú a dolog, ami be van írva megváltoztatjuk a fontSize-ot!!!!! 
        */
        useEffect(() => {
            if (currentValue.length >= 26) {
                setFontSize(16)
            } else if (currentValue.length >= 21) {
                setFontSize(20)
            } else {
                setFontSize(25);
            }
        }, [currentValue]);
        /*
        és nagyon fontos, hogy a useStates-s fontSize értékét majd meg kell adni a return-ben a display-es div-nek a style-val 
        fontSize-ba ennek a változónak az értékét!!!! -> style={{fontSize:`${fontSize}px`}}
    
        és ami még fontos, hogy a currentValue-nak a length-je 0, akkor egy nulla legyen kiírva kezdőértéknek ha meg van valami 
        akkor meg az legyen kiírva!!!! 
        -> 
        {currentValue.length > 0 ? currentValue : "0"}
        */


        return (
            <div className="container">
                <div className="display" style={{fontSize:`${fontSize}px`}}>
                    {currentValue.length > 0 ? currentValue : "0"}
                </div>
                <div className="calculator-grid">
                <div onClick={clear}
                className="calc-btn">CE</div>
                <div></div>
                <div></div>
                <div onClick={()=>operatorClick("/")}
                className="calc-btn">/</div>

                <div onClick={()=>numberClick(7)}
                className="calc-btn">7</div>
                <div onClick={()=>numberClick(8)}
                className="calc-btn">8</div>
                <div onClick={()=>numberClick(9)}
                className="calc-btn">9</div>
                <div onClick={()=>operatorClick("*")}
                className="calc-btn">*</div>

                <div onClick={()=>numberClick(4)}
                className="calc-btn">4</div>
                <div onClick={()=>numberClick(5)}
                className="calc-btn">5</div>
                <div onClick={()=>numberClick(6)}
                className="calc-btn">6</div>
                <div onClick={()=>operatorClick("-")}
                className="calc-btn">-</div>

                <div onClick={()=>numberClick(1)}
                className="calc-btn">1</div>
                <div onClick={()=>numberClick(2)}
                className="calc-btn">2</div>
                <div onClick={()=>numberClick(3)}
                className="calc-btn">3</div>
                <div onClick={()=>operatorClick("+")}
                className="calc-btn">+</div>

                <div onClick={()=>numberClick("-")}
                className="calc-btn">neg</div>
                <div onClick={()=>numberClick(0)}
                className="calc-btn">0</div>
                <div onClick={()=>numberClick(".")}
                className="calc-btn">.</div>
                <div onClick={()=>calculate("")}
                className="calc-btn">=</div>
            </div>
            </div>
        );
    }
}

/*
fontos, hogy mikor mit adunk majd át 
3 fajta van (numberClick(), operatorClick() calculate())
1.          
<div onClick={()=>calculate("")}
className="calc-btn">=</div>
2. 
<div onClick={()=>numberClick(".")}
className="calc-btn">.</div>
3. 
<div onClick={()=>operatorClick("+")}
className="calc-btn">+</div>
*/

export default Calculator;