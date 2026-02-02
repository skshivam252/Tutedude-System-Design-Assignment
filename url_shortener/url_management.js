const crc32 = require("crc-32");
var base62 = require("base62")

const URL_MAP = {}; //store <short_url>:<long_url> mapping
const REVERSE_URL_MAP = {} //store <long_url>:<short_url> mapping for quick reverse lookup


/*
As this is personal project, hash function used is crc-32 which is basic and can lead to duplicacy.
SHA-1 or md5sum can be also be used
To provide more robustness collision handling can also be introduced.
*/

const hash_long_url = (url)=>{
    return new Promise((resolve,reject)=>{
        try{
            let crc = crc32.str(url); //convert to crc-32
            crc = crc >>> 0; //remove signed bit
            
            var shortCode = base62.encode(crc); //convert to base 62

            //Collision handling can be introduced here, to improve further
            resolve(shortCode);
        }
        catch(err){
            reject(err)
        }
    })
}

const url_shortener=(url)=>{
    return new Promise(async(resolve,reject)=>{
        //check if url is already present 
        if(url in REVERSE_URL_MAP){
            return resolve(REVERSE_URL_MAP[url]);
        }
        //hash the url and store if not present
        var url_hash = await hash_long_url(url);
        REVERSE_URL_MAP[url]=url_hash;
        URL_MAP[url_hash] = url;
        resolve(url_hash);
    })
}


//function to validate the input 
const shorten_url =(reqBody)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            var url = reqBody.url;
            if(url == null || url == "" || url == "undefined"){
                return reject("Please provide url.")
            }
            var shortened_url = await url_shortener(url);
            resolve(shortened_url); 
        }
        catch(err){
            console.log("Error while generating url",err);
            reject("Something went Wrong. Please try again.")
        }
    })
}

const get_original_url=(url)=>{
    return new Promise((resolve,reject)=>{
        if(url in URL_MAP){
            return resolve(URL_MAP[url])
        }
        reject("URL not found")
    })
}


module.exports = {
    shorten_url,
    get_original_url
}