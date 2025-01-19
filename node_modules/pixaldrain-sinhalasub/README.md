# pixaldrain-sinhalasub

## How to use.
put this on your `package.json`
```
"pixaldrain-sinhalasub": "git+https://github.com/DarkMakerofc/pixaldrain-sinhalasub.git"
```
And use like this
```
    const {PixaldrainDL} = require("pixaldrain-sinhalasub")
    var link = "https://sinhalasub.lk/movies/the-greatest-of-all-time-2024-sinhala-subtitles/"; // sinahlasub movie link
    var quality = "HD 720p"; // video quality
    
    var directLink = await PixaldrainDL(link,quality,"direct");
    var all_links = await PixaldrainDL(link,quality,"alllinks");

```
### `var all_links` Result.
```
{
  '4K 2160p': 'https://pixeldrain.com/api/file/nFP81WRg',
  'FHD 1080p': 'https://pixeldrain.com/api/file/8YQrJ2yn',
  'HD 720p': 'https://pixeldrain.com/api/file/nDM7ERPW',
  'SD 480p': 'https://pixeldrain.com/api/file/p6nmr7Vk'
}
```
### `var directLink` Result.
```
https://pixeldrain.com/api/file/nDM7ERPW
```
</br>

## OR
[copy](/copy.md)

====================================================================================

#### NPM : [mrnima-moviedl](https://www.npmjs.com/package/mrnima-moviedl)
### GITHUB : [MRnima](https://github.com/darkmakerofc)

```
inbox awilla kohomada ahanna oni ne karana widiha thama damme repo 1k hadala
```
