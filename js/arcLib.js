// MyLib.js
(function(global) {
    // Create an empty library object
    const arcLib = {};
    arcLib.pctgSplit = []
    arcLib.pi = Math.PI
    arcLib.piSplit = []
    arcLib.color = ['red','green','blue','orange','pink']

    // alert(arcLib.pi)

    // Define a method to show the elements
    arcLib.show = function(x,elem) {
    arcLib.pctgSplit = []
    arcLib.piSplit = []

      // Check if the argument is an array and not undefined
      let totalQty = 0;

      totalQty = x.reduce((sum, item) => sum + item.quantity, 0); // get total quantity

      if (Array.isArray(x)) {
        for (const [index, value] of x.entries()) {
          // totalQty += value.quantity;
          let pctg = (value.quantity/totalQty)*100;
          arcLib.pctgSplit.push(pctg);

          if(index == 0)
          {
            let currentas = arcLib.pi;
            let currentae = (pctg/100)*(arcLib.pi)+arcLib.pi;
            let objOfPi = { 'as' : currentas, 'ae' : currentae };
            arcLib.piSplit.push(objOfPi);
            // arcLib.piSplit[index].as = arcLib.pi;
            // arcLib.piSplit[index].ae = (pctg/100)*(arcLib.pi *2);

          }else{

            let reducedPctg = arcLib.pctgSplit.slice(0, index+1);
            let pctgAdd = reducedPctg.reduce((sum, item) => sum + item, 0);
            // console.log(index)
            let currentas = arcLib.piSplit[index -1].ae;
            let currentae = ((pctgAdd/100)*(arcLib.pi)+ arcLib.pi);
            let objOfPi = { 'as' : currentas, 'ae' : currentae };
            arcLib.piSplit.push(objOfPi);
            console.log(arcLib.piSplit)
            // return;
          }
        }

        const c = document.getElementById(elem);
        const ctx = c.getContext("2d");

        ctx.clearRect(0, 0, c.width, c.height);
        
        for (const [index, value] of arcLib.piSplit.entries()) {
        ctx.beginPath();
        var gap;
        if(index == 0) { gap = 0.00; } else { gap=0.02; }
        // ctx.arc(50, 50, 40, value.as+0.05, value.ae);
        ctx.arc(50, 50, 40, value.as+gap, value.ae);
        ctx.strokeStyle = arcLib.color[index];
        ctx.lineWidth = 15;
        ctx.stroke();
        }

      } else {
        console.log("Error: Expected an array.");
      }
    }
  
    // Expose the library to the global window object
    global.arcLib = arcLib;
  
  })(window);