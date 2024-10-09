
let URL = "https://dog.ceo/api/breeds/";
var countBreeds =0;


/**main**/
function main(){
    
        fetchBreeds("list/all");

}


/**fetching API**/
function fetchBreeds(link){

    try{
        alert("fetching...");
        fetch(URL+link)
       .then(response => {
        return response.json();
       })
       .then(data =>{
        try{
            var obj = data.message;
            console.log(obj);
            renderBreedAccordian(obj);
        }catch(error){
            alert("Error #001!");
            console.error('Error:', error);
    }
    })
    }catch(error){
        alert("Error #002!");
        console.error('Error:', error);
    }
    
}



/**rendering data**/
function renderBreedAccordian(obj){

    try{
        var objArr= Object.keys(obj);   //fetching keys
        var objVal= Object.values(obj);


        const accordian = document.querySelector(".accordian");

        //MAIN LOOP 
        for(let i=0; i < objArr.length; i++){

            /*display only if array length is greater than 0*/
            if(objVal[i].length>0){

                const item = document.createElement("div");
                item.classList.add("accordian-item");
                item.id = `accordian-item-${i}`; // Assign a dynamic id using 'i'
                //console.log(item.id);
                countBreeds ++;

                
                let countSubBreeds = objVal[i].length;

                const title = document.createElement("div");
                title.innerHTML =  objArr[i]  + ` (${countSubBreeds})`; 

                const icon = document.createElement("span");
                icon.classList.add("icon", "fa-solid", "fa-caret-down");

                const content = document.createElement("div");
                content.classList.add("accordian-content");
                // content.innerHTML = objVal[i];


                /*binding array elemets in ul*/
                const ul = document.createElement("ul");
                for(let j=0; j < objVal[i].length; j++){
                    const li = document.createElement("li");
                    li.textContent = objVal[i][j];
                    ul.appendChild(li);
                    
                }
                content.appendChild(ul);
                


                /*apending content and icon to accordian*/
                item.appendChild(title);
                item.appendChild(icon);
                accordian.appendChild(item);
                accordian.appendChild(content);


                /**adding click to accordian */
                item.addEventListener("click", function(event){

                    const itemId = item.id;
                    const accordianItem = document.getElementById(itemId);
                    const icon = accordianItem.querySelector('.icon');
                    const accordianContent = accordianItem.nextElementSibling;

                    if (icon.classList.contains('active')) {
                        icon.classList.remove('active');
                        accordianContent.style.maxHeight = null;
                    } else {
                        icon.classList.add('active');
                        accordianContent.style.maxHeight = accordianContent.scrollHeight + 'px';
                    }
                    
                })
    
            }
            
        }
        var listCount = document.getElementById("listCount");
        listCount.innerHTML=`(the list contans ${countBreeds} items)`;
         
    }catch(error){
        alert("Error #003!");
        console.error('Error:', error);
    }
}



main();

