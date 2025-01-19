
### Add this for your package.json
```
"mrnima-moviedl": "^1.0.0"
```


1. Copy This code and make file `pixaldrain-sinhslasub.js`
  Code :
```
// Credits;
// - site : sinhalasub.lk
// - code : mr nima
// - npm : mrnima-moviedl

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

```
2. Require you created file with correct file path.
```
var { PixaldrainDL } = require("/pixaldrain-sinhslasub.js");
```

### 1. Get all direct  links with quality.
```

(async function() {
    var link = "https://sinhalasub.lk/movies/the-greatest-of-all-time-2024-sinhala-subtitles/";
    var quality = "HD 720p";
    var type = "allinks" // "direct"
    
    console.log(await PixaldrainDL(link,quality,type))  
}())
```
### Result
```
{
  '4K 2160p': 'https://pixeldrain.com/api/file/nFP81WRg',
  'FHD 1080p': 'https://pixeldrain.com/api/file/8YQrJ2yn',
  'HD 720p': 'https://pixeldrain.com/api/file/nDM7ERPW',
  'SD 480p': 'https://pixeldrain.com/api/file/p6nmr7Vk'
}
```
</br>

### 2. Get only one direct link is you given quality.
```

(async function() {
    var link = "https://sinhalasub.lk/movies/the-greatest-of-all-time-2024-sinhala-subtitles/";
    var quality = "HD 720p";
    var type = "direct" // "alllinks"
    
    console.log(await PixaldrainDL(link,quality,type))  
}())
```
### Result
```
https://pixeldrain.com/api/file/nDM7ERPW
```

### for your bot.
```
    var link = "https://sinhalasub.lk/movies/the-greatest-of-all-time-2024-sinhala-subtitles/";
    var quality = "HD 720p";
    var type = "direct" // "alllinks"
    
    const directLink = await PixaldrainDL(link,quality,type))
    await sock.sendMessage(jid,{ document : { url : directLink }, fileName : "file.mp4" other options ..})


```
