const buttonRF=document.getElementById("apiBtn");
const dataContRF=document.getElementById("data-c");
const inputApi=document.getElementById("inputAPI");
const darkModeBtn=document.getElementById("dark-Btn");


//

buttonRF.addEventListener("click",async ()=>{
    if(inputApi.value===""){
        alert("Enter API key");
        return;
    }
    setTimeout(()=>{
        fetch(inputApi.value,{
            method:'GET'
        })
        .then(response=>response.json()) //first response :-JSON => json --> objects
        .then((refData)=>{
            let recvData;
            if(refData.data?.data){//Does data.data exist, and does it contain a property called data / Optional chaining
                recvData=refData.data.data;
            }
            else if(refData.data){//checks wheather refData(object{}) has property .data
                recvData=refData.data;
            }
            else{//else if their is refData={....key:values...}
                recvData=refData;
            }

            //check wether the refData is an array or object => if array we directly move to else block 
            // and iterate its element and if object we convert it into array to make it iterable.
            if(!Array.isArray(recvData)){
                recvData=[recvData];
            }
            //This always works on array,map,strings and sets
            for(const item of recvData){
                //This iterates over the enumerable property names (keys) of an object.
                for(const key in item){
                    //rendering
                    const row=document.createElement("div");
                    row.textContent=`${key}   :-  ${item[key]}`;
                    dataContRF.append(row);
                }
            }
        })
    },100);
    //after every click i want previous to wipe out new to come.
    dataContRF.innerHTML = "";
});
darkModeBtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark-mode");
    darkModeBtn.classList.toggle("lightBtn");
});

/**
 * 
lets say refData is 
refData=
{
    "data':{
        Name:"Excel",
        Symbol:"EXCEL"
    }
}

 *
let recvdata;
if(refData.data?.data) yes refData.data exist but .data is not inside it 
else(refData.data) yes refData.data exist =>recvData=refData.data;

 *
now recvData=refData.data;
if(!Array.isArray(recvData)) ❌not an array 
convert it into an array => recvData=[recvData];

 *
now we have
recvData=
[
    "data":{
        Name:"Excel",
        Symbol:"EXCEL"
    }
]

 *
lets iterate and get our actual data out.....\
->for(const item of recvData) 
Since "data"=[Object] is only item init 
.: for(const key in item) this helps iteration in Objects
key=>Name ,Symbol
 *
->created div element 
->added textContent = `${key} : ${item[key]}`; =>key:value pair
->appended into data Container (dataContRF) 


 */