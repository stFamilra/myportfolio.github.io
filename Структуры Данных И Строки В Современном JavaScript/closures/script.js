
const boardPassengers = (passengerNumber, secondsBeforeBoarding)=>{
    const passengerInGroup = passengerNumber / 2;
 

    setTimeout(function(){
        console.log(`All ${passengerNumber} passengers are now boarding`);

        console.log(`Each group contains ${passengerInGroup} passengers`);
    }, secondsBeforeBoarding * 1000);

    console.log(`The boearding will start in ${secondsBeforeBoarding} seconds`)
}


(function () {
    const h2 = document.querySelector('h2');
    h2.style.color = 'orange';

    document.querySelector('body').addEventListener('click', e => {
        h2.style.color = 'green'
    })
   })();



   