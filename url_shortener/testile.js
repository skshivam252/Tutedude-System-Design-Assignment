const { shorten_url, get_original_url } = require("./url_management")


const url = {url : "https://shvam.kumar/personal/use"}

shorten_url(url)
.then(async shorten_url=>{
    console.log(shorten_url)
    console.log(await get_original_url(shorten_url))
})
.catch(err=>{
    console.log("error",err);
})
.finally(()=>{
    process.exit(0);
})