/*

Component loader by Shivank Kacker

Notes: 
It takes a lot to move away from jQuery.

*/

const componentLoader = {
    get : (res, callback) => { //Fetches a resource and sends data in promise
        fetch(res)
        .then(response => response.text())
        .then(data => callback(data));
    },
    load : (callback) => {
        let len = document.querySelectorAll(componentLoader.indicator).length;
        document.querySelectorAll(componentLoader.indicator).forEach((comp, i) =>{ //queries through all component elements
            let compRes = comp.getAttribute('compRes');

            componentLoader.get(compRes, (data)=>{ //gets component data and then displays in respective elements
                comp.innerHTML = data;
                console.log('%cLoaded Component '+(i+1),'color:lightgreen;');
                if(i == len - 1){
                    callback();
                }
            });

            
        });
    },
    indicator : "[component]"
}