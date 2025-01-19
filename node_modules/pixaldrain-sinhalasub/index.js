const { sinhalaSub } = require("mrnima-moviedl");

/**
 * download sinhalasub pixaldrain links.
 * @param {*} link - sinhala sub movie link
 * @param {*} quality - movie quality
 * @param {*} type - result type : direct or alllinks
 * @returns 
 */
async function PixaldrainDL(link,quality,type) {
    var movie = await sinhalaSub();

    var { result } = await movie.download(link);
    var pixeldrain = {};
    for (let index of result.links) {
        if (index.link.includes("https://pixeldrain.com/")) {
            pixeldrain[index.quality] = index.link.replace("/u/", "/api/file/")
        }
    }

    var directLink = pixeldrain[quality]
    return type === "direct" ? directLink : type === "alllinks" ? pixeldrain : "Give type : direct or alllinks" ;
}

module.exports = {
    PixaldrainDL
}



//Example
// var {PixaldrainDL} = require("./file...")
/*
(async function() {
    var link = "https://sinhalasub.lk/movies/the-greatest-of-all-time-2024-sinhala-subtitles/";
    var quality = "HD 720p";
    var type = "alllinks" // "alllinks"
    
    console.log(await PixaldrainDL(link,quality,type))      
}())*/

