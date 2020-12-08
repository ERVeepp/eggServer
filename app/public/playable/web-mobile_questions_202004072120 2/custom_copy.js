const fs = require('fs');
  const casecfgjsPath =  "custom/casecfg.js";
  const casecfgjsTarPath = "src/assets/custom/casecfg.js";
  const casecfgjsTarPath2 = "src/assets/resources/custom/casecfg.js";
      if(fs.existsSync(casecfgjsPath) ){
        if(fs.existsSync(casecfgjsTarPath) ){
            fs.renameSync(casecfgjsPath,casecfgjsTarPath);
        }
        if(fs.existsSync(casecfgjsTarPath2) ){
            fs.renameSync(casecfgjsPath,casecfgjsTarPath2);
        }
  }
  
  fs.readFile( 'md5map.json', 'utf8',(err, data) => {
      if (err) throw err;
      let cfgmap = JSON.parse(data);
      let tolen =  Object.keys(cfgmap).length;
  
      for (const key in cfgmap) {
        if (cfgmap.hasOwnProperty(key)) {
            const element = cfgmap[key];
          let curpath = "custom/" + element[0];
          if(element.length == 4 && fs.existsSync(curpath) ){ //替换关系成对出现
              console.log(curpath);
              fs.renameSync(curpath,element[3]);
          }
          if(--tolen ==0){
            console.log("资源替换已完成...");
          }
        }
      }
    });