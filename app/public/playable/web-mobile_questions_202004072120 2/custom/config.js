function isDev() {
    var host = location.host;
    if (host.indexOf("localhost") > -1 || isAllNumber(host)) {
      if (location.pathname.indexOf("/build/") > -1) {
        return false;
      }

      return true;
    }
    return false;
  }

function isAllNumber(s) {
    return /\d+\.\d+\.\d+\.\d+/.test(s);
}

if (isDev())  {
    window.gameCfg = {
        "global": {
            "autoopenstore": 0,
            "bgmvolume": 1.0,
            "clickvolume": 1.0,
            "rightvolume": 1.0,
            "wrongvolume": 1.0,
            "isautostart": true,
            "isshowclick": true,
            "questions": [
                {
                    "isshowbgm": false,
                    "questionvolume": 1.0,
                    "questionbgm": "https://sf3-ttcdn-tos.pstatp.com/obj/union-fe/00018ac7b7376d3f06c9f727b5a698fc/question1.mp3",
                    "options": [
                        {
                            "isright": false
                        },
                        {
                            "isright": false
                        },
                        {
                            "isright": true
                        },
                        {
                            "isright": false
                        }
                    ]
                },
                {
                    "isshowbgm": false,
                    "questionvolume": 1.0,
                    "questionbgm": "https://sf3-ttcdn-tos.pstatp.com/obj/union-fe/00018ac7b7376d3f06c9f727b5a698fc/question1.mp3",
                    "options": [
                        {
                            "isright": false
                        },
                        {
                            "isright": false
                        },
                        {
                            "isright": true
                        },
                        {
                            "isright": false
                        }
                    ]
                },
                {
                    "isshowbgm": false,
                    "questionvolume": 1.0,
                    "questionbgm": "https://sf3-ttcdn-tos.pstatp.com/obj/union-fe/00018ac7b7376d3f06c9f727b5a698fc/question1.mp3",
                    "options": [
                        {
                            "isright": false
                        },
                        {
                            "isright": true
                        },
                        {
                            "isright": false
                        },
                        {
                            "isright": false
                        }
                    ]
                },
            ],
            "defaultPrefix": "https://sf3-ttcdn-tos.pstatp.com/obj/union-fe/playable/788d56cee9e522b9a7cc901d7873a4bb"
        },
        "loading": {
            "loadingTotalBlurBg": "https://sf3-ttcdn-tos.pstatp.com/obj/union-fe/000065fbbb713ba1fafaa4b542d51273/question_preview_loadingTotalBg.png",
            "loadingTotalBg": "https://sf3-ttcdn-tos.pstatp.com/obj/union-fe/000065fbbb713ba1fafaa4b542d51273/question_preview_loadingTotalBg.png",
            "item": "https://sf3-ttcdn-tos.pstatp.com/obj/union-fe/000065fbbb713ba1fafaa4b542d51273/question_preview_item.png",
            "loadingBg": "https://sf3-ttcdn-tos.pstatp.com/obj/union-fe/000065fbbb713ba1fafaa4b542d51273/question_preview_loadingBg.png",
            "loadingFront": "https://sf3-ttcdn-tos.pstatp.com/obj/union-fe/000065fbbb713ba1fafaa4b542d51273/question_preview_loadingFront.png",
            "loadingLabelCol": "#FFFFFF"
        }
    }
}
