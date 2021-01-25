require=function r(c,s,a){function h(e,t){if(!s[e]){if(!c[e]){var o="function"==typeof require&&require;if(!t&&o)return o(e,!0);if(p)return p(e,!0);var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}var n=s[e]={exports:{}};c[e][0].call(n.exports,function(t){return h(c[e][1][t]||t)},n,n.exports,r,c,s,a)}return s[e].exports}for(var p="function"==typeof require&&require,t=0;t<a.length;t++)h(a[t]);return h}({BezierActionComponent:[function(t,e,o){"use strict";cc._RF.push(e,"e4186SLZ19FRp8d0/oXl3qY","BezierActionComponent"),Object.defineProperty(o,"__esModule",{value:!0});var i=t("../NotificationCenter"),n=t("../NotificationName"),r=t("./Bezier"),c=cc._decorator,s=c.ccclass,a=(c.property,function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._repeatForever=!1,t._lastDuration=0,t._duration=0,t._time=0,t.accuracy=1e6,t._canMove=!1,t._lockVertical=!1,t._lockHorizontal=!1,t}return __extends(t,e),t.prototype.onLoad=function(){i.NotificationCenter.Instance.on(n.NotificationName.BattleOver,this.pause,this),i.NotificationCenter.Instance.on(n.NotificationName.StartBubble,this.resume,this)},t.prototype.update=function(t){if(this._canMove&&(this._repeatForever||!(this._time>this._duration))){this._time+=t;var e=this.getDuration(this._time);if(e<this._lastDuration&&(this._time=10*this._time,this._time+=t),(!(e<this._lastDuration)||this._repeatForever)&&(this._lastDuration=e,this._bezier)){var o=this._bezier.getPoint(e);this.node.setPosition(o),.99<e&&(this.node.active=!1)}}},t.prototype.updateRotation=function(t){if(this.lastPosition)if(this._lockVertical&&this._lockHorizontal)this.node.rotation=0;else if(this._lockVertical){if(Math.abs(this.lastPosition.x-t.x)<1)return;this.node.rotationY=this.lastPosition.x<=t.x?0:180}else this.node.rotation=this.getRotation(t);this.lastPosition=t},t.prototype.lockVertical=function(){this._lockVertical=!0},t.prototype.lockHorizontal=function(){this._lockHorizontal=!0},t.prototype.getLockPosition=function(t){var e=this.getDuration(this._time+t);return e<this._lastDuration&&!this._repeatForever?new cc.Vec2(0,0):this._bezier.getPoint(e)},t.prototype.swimming=function(t,e,o){void 0===o&&(o=!0),this._speed=t,this._repeatForever=o,this._startPosition=e[0].getV2(),this._endPosition=e[e.length-1].getV2(),this._bezier=new(r.Bezier.bind.apply(r.Bezier,[void 0,e.length].concat(e))),this.setDuration(this.getLength()/t),this._canMove=!0,this._repeatForever},t.prototype.isStop=function(){return 0==this._canMove&&0==this._time},t.prototype.restart=function(){this._time=0,this._canMove=!0},t.prototype.stop=function(){this._canMove=!1,this._time=0},t.prototype.isPause=function(){return 0==this._canMove&&0<this._time},t.prototype.pause=function(){this._canMove=!1},t.prototype.resume=function(){this._canMove=!0,this._bezier},t.prototype.totalDuration=function(){return this._duration},t.prototype.setDuration=function(t){this._duration=t},t.prototype.getDuration=function(t){return~~(t*this.accuracy)%~~(this._duration*this.accuracy)/~~(this._duration*this.accuracy)},t.prototype.getLength=function(){return this._bezier.getLength()},t.prototype.getRotation=function(t){var e;if(t!=this.lastPosition)return t.x-this.lastPosition.x==0?e=0<t.y-this.lastPosition.y?0:180:(e=180*-Math.atan((t.y-this.lastPosition.y)/(t.x-this.lastPosition.x))/3.14,0<t.x-this.lastPosition.x?e+=90:e-=90),e=this.horizontalRotation(e)},t.prototype.horizontalRotation=function(t){var e=t;return this._lockHorizontal&&(0<=t?180<t?(e=t-180,this.node.scaleY=-Math.abs(this.node.scaleY)):this.node.scaleY=Math.abs(this.node.scaleY):-180<t?(e=180-Math.abs(t),this.node.scaleY=-Math.abs(this.node.scaleY)):this.node.scaleY=Math.abs(this.node.scaleY)),e},t=__decorate([s],t)}(cc.Component));o.BezierActionComponent=a,cc._RF.pop()},{"../NotificationCenter":"NotificationCenter","../NotificationName":"NotificationName","./Bezier":"Bezier"}],BezierAction:[function(t,e,o){"use strict";cc._RF.push(e,"59f1b9yM81OPIiLFCYaSvRz","BezierAction"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,r=i.property,c=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.target=null,t.ctrls=[],t.duration=2,t}return __extends(t,e),t.prototype.start=function(){this.oldPosition=this.node.position},t.prototype.play=function(){var e=[];this.ctrls.forEach(function(t){e.push(t.position)}),e.push(this.target.position),this.node.runAction(cc.bezierTo(this.duration,e))},t.prototype.reset=function(){this.node.position=this.oldPosition},__decorate([r(cc.Node)],t.prototype,"target",void 0),__decorate([r([cc.Node])],t.prototype,"ctrls",void 0),__decorate([r(Number)],t.prototype,"duration",void 0),t=__decorate([n],t)}(cc.Component);o.default=c,cc._RF.pop()},{}],BezierDraw:[function(t,e,o){"use strict";cc._RF.push(e,"26c4bGxYmpKxI4NUYLBdB4m","BezierDraw"),Object.defineProperty(o,"__esModule",{value:!0});var r=t("./BezierAction"),s=t("./Merge/BezierPoint"),a=t("./Merge/BezierActionComponent"),i=t("./NotificationCenter"),n=t("./NotificationName"),h=t("./GameMgr"),c=cc._decorator,p=c.ccclass,u=c.property,l=c.executeInEditMode,d=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.bezierActions=[],t.actionNode=null,t.duration=2,t.mergeHolder=null,t.dotPrefab=null,t.controlPointPrefab=null,t.keyPointPrefab=null,t.graphics=null,t.bezierParamsJson="",t.lastDotPosition=null,t.time=0,t.bubblePre=null,t.moveSpeed=1e3,t}return __extends(t,e),t.prototype.onLoad=function(){i.NotificationCenter.Instance.on(n.NotificationName.BattleOver,this.pauseSchedule,this),i.NotificationCenter.Instance.on(n.NotificationName.StartBubble,this.playMergeBezierAction,this),this.StartplayMergeBezierAction(1e3,.08),this.scheduleOnce(function(){h.default.instance.stopAllBubble()},.68)},t.prototype.start=function(){this.graphics=this.getComponent(cc.Graphics)},t.prototype.update=function(t){this.time+=t},t.prototype.lateUpdate=function(){this.checkPosition()},t.prototype._getBezierParams=function(){var o=[];return this.bezierActions.forEach(function(t){if(t){var e=[t.node.position,t.ctrls[0].position,t.ctrls[1].position,t.target.position];o.push(e)}}),o},t.prototype._getMergeBezierPoints=function(){var e=[];return this.bezierActions.forEach(function(t){t&&((e.length<=0||!cc.pointEqualToPoint(e[e.length-1],t.node.position))&&e.push(t.node.position),e.push(t.ctrls[0].position),e.push(t.ctrls[1].position),e.push(t.target.position))}),e},t.prototype._onDrawBezierCurve=function(){var e=this;this.bezierActions.find(function(t){return t.node.getNumberOfRunningActions()})||(this.graphics.clear(),this.bezierActions.forEach(function(t){e._drawOneBezier(t)}))},t.prototype._drawOneBezier=function(t){this._drawLine(t.node,t.ctrls[0],cc.Color.RED),this._drawLine(t.target,t.ctrls[1],cc.Color.RED),this.graphics.strokeColor=cc.Color.BLUE,this.graphics.lineWidth=4,this.graphics.moveTo(t.node.x,t.node.y),this.graphics.bezierCurveTo(t.ctrls[0].x,t.ctrls[0].y,t.ctrls[1].x,t.ctrls[1].y,t.target.x,t.target.y),this.graphics.stroke()},t.prototype._drawLine=function(t,e,o){this.graphics.strokeColor=o,this.graphics.lineWidth=2,this.graphics.moveTo(t.x,t.y),this.graphics.lineTo(e.x,e.y),this.graphics.stroke()},t.prototype._drawMergeLine=function(){if(.1<this.time&&!cc.pointEqualToPoint(this.actionNode.position,this.lastDotPosition)){this.time=0;var t=cc.instantiate(this.dotPrefab);t.parent=this.mergeHolder,t.position=this.lastDotPosition=this.actionNode.position}},t.prototype.checkPosition=function(){var t=this._getBezierParams();this.bezierParamsJson!=JSON.stringify(t)&&(this.bezierParamsJson=JSON.stringify(t),console.log(this.bezierParamsJson),this._onDrawBezierCurve())},t.prototype.addPoint=function(){this.node.children.forEach(function(t){console.log(t.name)});var t=cc.instantiate(this.controlPointPrefab),e=cc.instantiate(this.controlPointPrefab),o=cc.instantiate(this.keyPointPrefab),i=this.node.children[this.node.childrenCount-2],n=this.node.children[this.node.childrenCount-1];o.position=cc.pAdd(n.position,new cc.Vec2(-30,-30)),e.position=cc.pAdd(o.position,new cc.Vec2(0,30)),t.position=cc.pMidpoint(i.position,o.position),o.getComponent(r.default).target=n,o.getComponent(r.default).ctrls=[t,e],i.getComponent(r.default).target=o,this.node.insertChild(t,this.node.childrenCount-1),this.node.insertChild(e,this.node.childrenCount-1),this.node.insertChild(o,this.node.childrenCount-1),this.bezierActions.push(o.getComponent(r.default))},t.prototype.playBezierAction=function(){var e=this;this.mergeHolder.removeAllChildren();var t=this._getBezierParams();this.actionNode.rotation=0,this.actionNode.position=t[0][0];var o=t.map(function(t){return cc.bezierTo(e.duration,t.slice(1))});this.actionNode.runAction(cc.sequence(o))},t.prototype.StartplayMergeBezierAction=function(i,t){var n=this;this.mergeHolder.removeAllChildren();var e=this._getMergeBezierPoints(),r=[];e.forEach(function(t){r.push(s.default.Create(t.x,t.y))});var c=this.actionNode.childrenCount-2;this.schedule(function(){if(c++,n.actionNode.getComponent(a.BezierActionComponent))var t=n.actionNode.children[c].getComponent(a.BezierActionComponent);else t=n.actionNode.children[c].addComponent(a.BezierActionComponent);t&&t.swimming(i,r,!1);var e=cc.instantiate(n.bubblePre),o=h.default.instance.randNum(0,h.default.instance.instanceSpriteArr.length-1);e.getComponent(cc.Sprite).spriteFrame=h.default.instance.instanceSpriteArr[o],e.parent=n.actionNode},t,1e4),console.log("*********** megre ************"),console.log(JSON.stringify(e)),console.log("******************************")},t.prototype.playMergeBezierAction=function(){var i=this;this.mergeHolder.removeAllChildren();var t=this._getMergeBezierPoints(),n=[];t.forEach(function(t){n.push(s.default.Create(t.x,t.y))});var r=this.actionNode.childrenCount-2;this.schedule(function(){if(r++,i.actionNode.getComponent(a.BezierActionComponent))var t=i.actionNode.children[r].getComponent(a.BezierActionComponent);else t=i.actionNode.children[r].addComponent(a.BezierActionComponent);t&&t.swimming(100,n,!1);var e=cc.instantiate(i.bubblePre),o=h.default.instance.randNum(0,h.default.instance.instanceSpriteArr.length-1);e.getComponent(cc.Sprite).spriteFrame=h.default.instance.instanceSpriteArr[o],e.parent=i.actionNode},.8,1e4),console.log("*********** megre ************"),console.log(JSON.stringify(t)),console.log("******************************")},t.prototype.pauseSchedule=function(){console.log("暂停生成移动"),this.unscheduleAllCallbacks()},__decorate([u([r.default])],t.prototype,"bezierActions",void 0),__decorate([u(cc.Node)],t.prototype,"actionNode",void 0),__decorate([u(Number)],t.prototype,"duration",void 0),__decorate([u(cc.Node)],t.prototype,"mergeHolder",void 0),__decorate([u(cc.Prefab)],t.prototype,"dotPrefab",void 0),__decorate([u(cc.Prefab)],t.prototype,"controlPointPrefab",void 0),__decorate([u(cc.Prefab)],t.prototype,"keyPointPrefab",void 0),__decorate([u(cc.Prefab)],t.prototype,"bubblePre",void 0),t=__decorate([p,l],t)}(cc.Component);o.default=d,cc._RF.pop()},{"./BezierAction":"BezierAction","./GameMgr":"GameMgr","./Merge/BezierActionComponent":"BezierActionComponent","./Merge/BezierPoint":"BezierPoint","./NotificationCenter":"NotificationCenter","./NotificationName":"NotificationName"}],BezierImpl:[function(t,e,o){"use strict";cc._RF.push(e,"21daeuJYHREK44l+Qte+4Wi","BezierImpl"),Object.defineProperty(o,"__esModule",{value:!0});var i=function(){function t(t,e,o,i){this.p0=t,this.p1=e,this.p2=o,this.mSpeedRate=i,this.ax=this.p0.x-2*this.p1.x+this.p2.x,this.ay=this.p0.y-2*this.p1.y+this.p2.y,this.bx=2*(this.p1.x-this.p0.x),this.by=2*(this.p1.y-this.p0.y),this.A=4*(this.ax*this.ax+this.ay*this.ay),this.B=4*(this.ax*this.bx+this.ay*this.by),this.C=this.bx*this.bx+this.by*this.by,this.t0=Math.sqrt(this.C),this.t1=8*Math.pow(this.A,1.5),this.m0=(this.B*this.B-4*this.A*this.C)/this.t1,this.m1=2*Math.sqrt(this.A),this.m2=this.m1/this.t1,this.ttt=this.B+this.m1*this.t0,this.m3=this.m0*Math.log(this.ttt<=0?1e-7:this.ttt)-this.B*this.m2*this.t0,this.f0=this.A+this.B,this.f1=this.A+this.f0,this.temp1=this.C+this.f0,this.f2=Math.sqrt(this.temp1<0?0:this.temp1),this.temp1=this.f1+this.m1*this.f2,this.f3=Math.log(this.temp1<=0?1e-7:this.temp1),this.mLength=(this.m3-this.m0*this.f3+this.m2*this.f1*this.f2)*(1/i),this.A=this.A,this.B=this.B,this.C=this.C,this.m0=this.m0,this.m1=this.m1,this.m2=this.m2,this.m3=this.m3,this.p0=this.p0,this.p1=this.p1,this.p2=this.p2}return t.prototype.getLength=function(){return this.mLength},t.prototype.getPoint=function(t){for(var e=this.m3-t*this.mLength*this.mSpeedRate,o=0;o<7;++o){var i=this.A*t,n=this.B+i,r=n+i,c=this.C+t*n,s=Math.sqrt(c<0?0:c);c=r+this.m1*s;var a=Math.log(c<=0?1e-7:c),h=(e-this.m0*a)/s+this.m2*r;if(t-=h,Math.abs(h)<.01)break}var p=t*t,u=t+t,l=1-u+p;return u-=p+p,cc.v2(l*this.p0.x+u*this.p1.x+p*this.p2.x,l*this.p0.y+u*this.p1.y+p*this.p2.y)},t}();o.BezierImpl=i,cc._RF.pop()},{}],BezierPoint:[function(t,e,o){"use strict";cc._RF.push(e,"12340tKeLpB2q86C4/uXOGV","BezierPoint"),Object.defineProperty(o,"__esModule",{value:!0});var i=function(){function i(t,e,o){this._speedRate=1,this._x=t,this._y=e,o&&(this._speedRate=o)}return i.prototype.getV2=function(){return cc.v2(this._x,this._y)},i.prototype.getSpeedRate=function(){return this._speedRate},i.Create=function(t,e,o){return new i(t,e,o)},i}();o.default=i,cc._RF.pop()},{}],Bezier:[function(t,e,o){"use strict";cc._RF.push(e,"df32cJQAAVKErNRt49yt6gM","Bezier"),Object.defineProperty(o,"__esModule",{value:!0});var s=t("./BezierImpl"),i=function(){function t(t){for(var e=[],o=1;o<arguments.length;o++)e[o-1]=arguments[o];this.mMap=[],this.mIndex=0;var i=e[this.mIndex++];this.p0=i.getV2(),this.mSpeedRate=i.getSpeedRate(),this.mLength=0,this.mMap=[];for(var n=3;n<t;++n){var r=cc.v2((e[this.mIndex].getV2().x+e[this.mIndex+1].getV2().x)/2,(e[this.mIndex].getV2().y+e[this.mIndex+1].getV2().y)/2),c=new s.BezierImpl(this.p0,e[this.mIndex].getV2(),r,this.mSpeedRate);this.mMap.push({first:this.mLength,second:c}),this.mLength+=c.getLength(),this.p0=r,this.mSpeedRate=e[this.mIndex+1].getSpeedRate(),this.mIndex++}c=new s.BezierImpl(this.p0,e[this.mIndex].getV2(),e[this.mIndex+1].getV2(),this.mSpeedRate);this.mMap.push({first:this.mLength,second:c}),this.mLength+=c.getLength(),this.mMap.sort(this.sortCmd)}return t.prototype.sortCmd=function(t,e){return t.first-e.first},t.prototype.getLength=function(){return this.mLength},t.prototype.getPoint=function(t){t*=this.mLength;var e=this.mMap[Math.max(0,this.upperBound(t)-1)];return t=(t-e.first)/e.second.getLength(),e.second.getPoint(t)},t.prototype.upperBound=function(t){var e;for(e=0;e<this.mMap.length&&!(this.mMap[e].first>t);++e);return e},t}();o.Bezier=i,cc._RF.pop()},{"./BezierImpl":"BezierImpl"}],Dragable:[function(t,e,o){"use strict";cc._RF.push(e,"f5b39rXIJJEn5FpJs1GZju3","Dragable"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,r=(i.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.onLoad=function(){this.node.on(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this)},e.prototype._onTouchMove=function(t){var e=t.getLocation();this.node.position=this.node.parent.convertToNodeSpaceAR(e)},e=__decorate([n],e)}(cc.Component));o.default=r,cc._RF.pop()},{}],FollowNode:[function(t,e,o){"use strict";cc._RF.push(e,"1c52b7RC9dHSrtdCsoTFNya","FollowNode"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,r=i.property,c=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.targetNode=null,t}return __extends(t,e),t.prototype.start=function(){console.log("start")},__decorate([r(cc.Node)],t.prototype,"targetNode",void 0),t=__decorate([n],t)}(cc.Component);o.default=c,cc._RF.pop()},{}],GameMgr:[function(t,e,o){"use strict";cc._RF.push(e,"5c4feDPSIBGvok00IlbJbmW","GameMgr"),Object.defineProperty(o,"__esModule",{value:!0});var n=t("./Merge/BezierActionComponent"),r=t("./NotificationCenter"),c=t("./NotificationName"),i=cc._decorator,s=i.ccclass,a=i.property,h=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.angle=0,t.isShooting=!1,t.shootDir=null,t.shootBubble=null,t.shootBubblePre=null,t.bubbleLayer=null,t.shooterLayer=null,t.instanceSpriteArr=[],t.shooterSpriteArr=[],t.moneyNum=0,t.overLabel=null,t.moenyLabel=null,t.moneyNode=null,t.overScene=null,t.overScaleNode=null,t.light=null,t.guide=null,t.isOnce=!0,t.titleNode=null,t.maxGameCount=8,t.gameNum=1,t.overBtn=null,t}return __extends(t,e),(i=t).prototype.onLoad=function(){var o=this;null==i.instance?((i.instance=this).overLabel.string="88.00",cc.director.getPhysicsManager().enabled=!0,cc.director.on("touchShooter",function(t){var e=cc.degreesToRadians(o.angle);o.shootDir=cc.v2(-Math.sin(e),Math.cos(e)),console.log("发射"),o.gameNum<o.maxGameCount&&(o.gameNum++,o.isShooting=!0,o.scheduleOnce(function(){o._creatorShooterBall()},1),6==o.gameNum&&o.scheduleOnce(function(){o.showSqueeze()},.5))}),this.titleNode.on(cc.Node.EventType.TOUCH_START,this.overGet,this)):this.destroy()},t.prototype.update=function(t){this.isShooting&&this._bubbleMove(t),this.light.rotation+=.5},t.prototype._bubbleMove=function(t){var e=this.shootBubble;e.x+=1200*this.shootDir.x*t,e.y+=1200*this.shootDir.y*t},t.prototype.addMoney=function(t,e){this.schedule(function(){this.moneyMove(t,e)},.07,4),this.scheduleOnce(function(){},15)},t.prototype.moneyMove=function(t,e){var o=this,i=cc.instantiate(t);i.parent=t.parent,i.opacity=255;var n=cc.callFunc(function(){i.stopAction(r),i.active=!1,o.moneyNum+=6,90<=o.moneyNum&&o.showSqueeze(),o.moenyLabel.string="￥  "+o.moneyNum.toString()},this),r=cc.sequence(cc.spawn(cc.moveTo(.25,e),cc.scaleTo(.3,.4)),n);i.runAction(r)},t.prototype.stopAllBubble=function(){r.NotificationCenter.Instance.emit(c.NotificationName.BattleOver)},t.prototype.startAllBubble=function(){r.NotificationCenter.Instance.emit(c.NotificationName.StartBubble);for(var t=0;t<this.bubbleLayer.childrenCount;t++)this.bubbleLayer.children[t].getComponent(n.BezierActionComponent).resume(),this.bubbleLayer.children[t].getComponent(n.BezierActionComponent)._time<.1&&(this.bubbleLayer.children[t].getComponent(n.BezierActionComponent)._time=10*this.bubbleLayer.children[t].getComponent(n.BezierActionComponent)._time),this.bubbleLayer.children[t].getComponent(n.BezierActionComponent)._duration<10&&(this.bubbleLayer.children[t].getComponent(n.BezierActionComponent)._duration=10*this.bubbleLayer.children[t].getComponent(n.BezierActionComponent)._duration)},t.prototype._creatorShooterBall=function(){var t=cc.instantiate(this.shootBubblePre);t.parent=this.shooterLayer,t.position=cc.v2(0,0);var e=this.randNum(0,1);t.getComponent(cc.Sprite).spriteFrame=this.shooterSpriteArr[e],this.isShooting=!1,this.shootBubble.destroy(),this.shootBubble=t},t.prototype.randNum=function(t,e){return t+Math.floor((e-t+1)*Math.random())},t.prototype.showSqueeze=function(){r.NotificationCenter.Instance.emit(c.NotificationName.Success),this.overScene.zIndex=this.overScene.parent.childrenCount-1,this.overScaleNode.scale=.1,this.overScaleNode.runAction(cc.scaleTo(.3,1)),this.overBtn.on(cc.Node.EventType.TOUCH_START,this.overGet,this)},t.prototype.overGet=function(){window.playableSDK.openAppStore()},t.instance=null,__decorate([a(cc.Node)],t.prototype,"shootBubble",void 0),__decorate([a(cc.Prefab)],t.prototype,"shootBubblePre",void 0),__decorate([a(cc.Node)],t.prototype,"bubbleLayer",void 0),__decorate([a(cc.Node)],t.prototype,"shooterLayer",void 0),__decorate([a([cc.SpriteFrame])],t.prototype,"instanceSpriteArr",void 0),__decorate([a([cc.SpriteFrame])],t.prototype,"shooterSpriteArr",void 0),__decorate([a(cc.Label)],t.prototype,"overLabel",void 0),__decorate([a(cc.Label)],t.prototype,"moenyLabel",void 0),__decorate([a(cc.Node)],t.prototype,"moneyNode",void 0),__decorate([a(cc.Node)],t.prototype,"overScene",void 0),__decorate([a(cc.Node)],t.prototype,"overScaleNode",void 0),__decorate([a(cc.Node)],t.prototype,"light",void 0),__decorate([a(cc.Node)],t.prototype,"guide",void 0),__decorate([a(cc.Node)],t.prototype,"titleNode",void 0),__decorate([a(cc.Node)],t.prototype,"overBtn",void 0),t=i=__decorate([s],t);var i}(cc.Component);o.default=h,cc._RF.pop()},{"./Merge/BezierActionComponent":"BezierActionComponent","./NotificationCenter":"NotificationCenter","./NotificationName":"NotificationName"}],HandAnim:[function(t,e,o){"use strict";cc._RF.push(e,"05fcccIG9lC+qTaX3tCmKzR","HandAnim"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,r=(i.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.start=function(){var t=cc.repeatForever(cc.sequence(cc.moveTo(1,this.node.x+80,this.node.y),cc.moveTo(1,this.node.x-80,this.node.y)));this.node.runAction(t)},e=__decorate([n],e)}(cc.Component));o.default=r,cc._RF.pop()},{}],IPXWidgetComponent:[function(t,e,o){"use strict";cc._RF.push(e,"8f51bP6K6hKF7D9C1kye8Mp","IPXWidgetComponent"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,r=(i.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),(o=e).prototype.onLoad=function(){var t=this;this.Canvas=this.node.getComponent(cc.Canvas),this.updateCanvasSize(),cc.view.setResizeCallback(function(){t.updateCanvasSize()})},e.prototype.updateCanvasSize=function(){var t=cc.view.getFrameSize();t.width>t.height?cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE):cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT)},e.prototype.showLandscape=function(){o.isPortait=!1},e.prototype.showPortait=function(){o.isPortait=!0},e.isPortait=!0,e=o=__decorate([n],e);var o}(cc.Component));o.default=r,cc._RF.pop()},{}],Interface:[function(t,e,o){"use strict";var i;cc._RF.push(e,"b77b2yoPgBGc4a27dLakWJU","Interface"),Object.defineProperty(o,"__esModule",{value:!0}),(i=o.EVENT||(o.EVENT={})).TOUCHEND_SHOOT="shoot",i.TOUCHSTOP="stop",cc._RF.pop()},{}],NotificationCenter:[function(t,e,o){"use strict";cc._RF.push(e,"e755d8uyBJHj6hpLD2OUyTK","NotificationCenter"),Object.defineProperty(o,"__esModule",{value:!0});var i=function(){function t(){this.eventTarget=new cc.EventTarget}return Object.defineProperty(t,"Instance",{get:function(){return null==this.instance&&(this.instance=new t),this.instance},enumerable:!0,configurable:!0}),t.prototype.on=function(t,e,o){this.eventTarget.on(t,e,o)},t.prototype.emit=function(t,e,o,i,n,r){this.eventTarget.emit(t,e)},t.prototype.off=function(t,e,o){this.eventTarget.off(t,e,o)},t.instance=null,t}();o.NotificationCenter=i,cc._RF.pop()},{}],NotificationName:[function(t,e,o){"use strict";var i;cc._RF.push(e,"7ca2ddoVlRCjZ7Y0knjOaXm","NotificationName"),Object.defineProperty(o,"__esModule",{value:!0}),(i=o.NotificationName||(o.NotificationName={})).BattleOver="BattleOver",i.StartBubble="StartBubble",i.ResizeCallback="ResizeCallback",i.RestColor="RestColor",i.startFruit="StartFruit",i.Rest="Rest",i.Success="Success",cc._RF.pop()},{}],TouchMgr:[function(t,e,o){"use strict";cc._RF.push(e,"1b8aeZfh99FFIP3I6qZN8nV","TouchMgr"),Object.defineProperty(o,"__esModule",{value:!0});var i=t("./GameMgr"),n=t("./NotificationCenter"),r=t("./NotificationName"),c=cc._decorator,s=c.ccclass,a=c.property,h=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.shooter=null,t.touchTarget=null,t}return __extends(t,e),t.prototype.onLoad=function(){this.openTouch(),n.NotificationCenter.Instance.on(r.NotificationName.Success,this.closeTouch,this)},t.prototype.openTouch=function(){this.touchTarget.on(cc.Node.EventType.TOUCH_START,this._touchStart,this),this.touchTarget.on(cc.Node.EventType.TOUCH_MOVE,this._touchsMove,this),this.touchTarget.on(cc.Node.EventType.TOUCH_END,this._touchEnd,this),this.shooter.active=!1},t.prototype.closeTouch=function(){this.touchTarget.off(cc.Node.EventType.TOUCH_START,this._touchStart,this),this.touchTarget.off(cc.Node.EventType.TOUCH_MOVE,this._touchsMove,this),this.touchTarget.off(cc.Node.EventType.TOUCH_END,this._touchEnd,this)},t.prototype._touchStart=function(t){var e=this.convertToDegree(t);this.shooter.rotation=-e,this.shooter.active=!0,i.default.instance.guide.activeInHierarchy&&(i.default.instance.guide.active=!1)},t.prototype._touchsMove=function(t){var e=this.convertToDegree(t);this.shooter.rotation=-e,this.shooter.active=!0},t.prototype._touchEnd=function(t){var e=this.convertToDegree(t);this.shooter.rotation=-e,this.shooter.active=!1,i.default.instance.angle=e,cc.director.emit("touchShooter",e),i.default.instance.isOnce&&this.scheduleOnce(function(){i.default.instance.startAllBubble(),i.default.instance.isOnce=!1},.8)},t.prototype.convertToDegree=function(t){var e=t.getLocation(),o=e.x-this.shooter.parent.convertToWorldSpaceAR(this.shooter.position).x,i=e.y-this.shooter.parent.convertToWorldSpaceAR(this.shooter.position).y,n=Math.atan2(i,o),r=cc.radiansToDegrees(n);return r-=90},__decorate([a(cc.Node)],t.prototype,"shooter",void 0),__decorate([a(cc.Node)],t.prototype,"touchTarget",void 0),t=__decorate([s],t)}(cc.Component);o.default=h,cc._RF.pop()},{"./GameMgr":"GameMgr","./NotificationCenter":"NotificationCenter","./NotificationName":"NotificationName"}],TweenScript:[function(t,e,o){"use strict";cc._RF.push(e,"04813/aVMlCpoV8DY1V745Q","TweenScript"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,r=(i.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.start=function(){cc.repeatForever(cc.sequence(cc.scaleTo(.7,1.2,1.2),cc.scaleBy(.7,.8,.8))).easing(cc.easeIn(1));var t=cc.repeatForever(cc.sequence(cc.rotateTo(.1,-7,-7),cc.rotateTo(.1,7,7),cc.rotateTo(.1,0,0),cc.rotateTo(.6,0,0)));t.easing(cc.easeBackIn()),this.node.runAction(t)},e=__decorate([n],e)}(cc.Component));o.default=r,cc._RF.pop()},{}],shooterBubble:[function(t,e,o){"use strict";cc._RF.push(e,"a5ac8R3OWxMzaK/kbO1lwmA","shooterBubble"),Object.defineProperty(o,"__esModule",{value:!0});var c=t("./GameMgr"),i=cc._decorator,n=i.ccclass,r=(i.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.start=function(){this.node.getComponent(cc.Sprite).spriteFrame.name},e.prototype.onBeginContact=function(t,e,o){if(c.default.instance.isShooting=!1,this.node.getComponent(cc.Sprite).enabled=!1,this.node.getComponent(cc.PhysicsCircleCollider).enabled=!1,e.node.getComponent(cc.Sprite).spriteFrame.name==o.node.getComponent(cc.Sprite).spriteFrame.name){console.log("合并"),c.default.instance.moneyNode.position=this.node.position,c.default.instance.addMoney(c.default.instance.moneyNode,c.default.instance.moenyLabel.node.position),this.node.children[0].getComponent(cc.Animation).play();for(var i=Number(e.node.getComponent(cc.Sprite).spriteFrame.name),n=i+i,r=0;r<c.default.instance.instanceSpriteArr.length;r++)c.default.instance.instanceSpriteArr[r].name==n.toString()&&(o.node.getComponent(cc.Sprite).spriteFrame=c.default.instance.instanceSpriteArr[r])}},e=__decorate([n],e)}(cc.Component));o.default=r,cc._RF.pop()},{"./GameMgr":"GameMgr"}],wowAnim:[function(t,e,o){"use strict";cc._RF.push(e,"cdcefaE9wBOH6SsDiJ8sEYa","wowAnim"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,r=(i.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.start=function(){var t=cc.repeatForever(cc.sequence(cc.rotateTo(1,30),cc.rotateTo(1,-25)));this.node.runAction(t)},e=__decorate([n],e)}(cc.Component));o.default=r,cc._RF.pop()},{}]},{},["BezierAction","BezierDraw","Dragable","FollowNode","GameMgr","HandAnim","IPXWidgetComponent","Interface","Bezier","BezierActionComponent","BezierImpl","BezierPoint","NotificationCenter","NotificationName","TouchMgr","TweenScript","shooterBubble","wowAnim"]);