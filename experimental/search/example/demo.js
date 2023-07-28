/*************************************************
 * 
 * @abstract refer to ../index.js for explanations
 * 
 ************************************************/

import j from "../data/dataset3-beautify.json" assert { type: 'json' }


console.log(j[0].annotation[0].points);

console.log(j[0].annotation[0].points[0].text);