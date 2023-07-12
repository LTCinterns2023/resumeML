/*************************************************************************************
 *    
 *   @brief a primitive resume-search method
 *   @description: the program will have two stages
 *      1. Will convert the resume to json and annotate important sections
 *      2. Uses converted resumes (json files) to return resumes to searcher (frontend)
 *   
 *   This file [index.js] will be demonstrating 2nd stage.
 * 
 *   @author windyskies
 *  
 *   @todos 
 *      1. implement elastic-search
 *      2. convert json file to nosql db
 *    
 *************************************************************************************/


import { log } from "console";
import conf from "./conf.json" assert { type: 'json'}

const { default: j } = await import(conf.path, {
  assert: {
    type: "json",
  },
})

//import j from "./data/dataset3-beautify.json" assert { type: 'json' }

//console.log(j[0].annotation[0].points);

/*************************************************************************************
 * the @json file has following structure:
 *  [{person1}, {person2}, ... {personN}]
 *   @extend person1 => {                  ---> @use j[i] 
 *      "content" : "fullResumeText",
 *      "annotation" : [arrayOfCategories of Object Type]
 *      "extras": null //usually for the testing dataset
 *  }
 *    
 *   @extend annotation => [ @type array   ----> @use j[i].annotation 
 *      {label: [ 'LabelName' ], points: [ [Object] ] },
 *      {label: [ '@example Skills' ], points: [ [Object] ] }
 *   ]
 *      
 *   @extend points => [      ----> @use j[i].annotation[j].points 
 *      { 
 *        start: index1, end: index2, 
 *        text: '\n' +'• Programming language: C, C++, Java\n' +
 *              '• Web Designing: HTML, XML\n' +
 *              '• Operating Systems: Windows […] Windows Server 2003, Linux.\n' +
 *              '• Database: MS Access, MS SQL Server 2008, Oracle 10g, MySql.'
 *       }
 *   ]
 *   @extend text => [      ----> @use j[i].annotation[j].points[k].text
 * 
 *************************************************************************************/

//console.log(j[0].annotation[0].points[0].text);


/** @brief primitive search methods */
/** @todo: implement new methods for performance and better match */

export function searchKeywords(keywords) {  // search using keywords
    //not a great way to search but will be used for v0
    const regex = new RegExp(keywords);
    console.log(regex);

    //without labels
    return j.filter(el => {
        return regex.test(el.content)
    })

}

export function searchwithLabel(lbl, keywords) {  // search using keywords

    //with labels 
    keywords.toLowerCase()
    console.log(keywords);
    return j.filter(el => { 
        return el.annotation.some(({label, points}) => label == lbl && points[0].text.toLowerCase() == keywords) 
        // @fix make it not equal but includes keywords
        // also make it case sensitive
    })
    
}
console.log(
    //searchKeywords("Abhishek"),
    searchwithLabel("Name", "Afreen Jamadar")[0]

);
export function filter(category, ...args) { // filter resumes by categories
    //incomplete
    return 0;
}