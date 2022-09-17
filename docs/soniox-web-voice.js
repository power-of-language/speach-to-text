var sonioxWebVoice;(()=>{"use strict";var e={d:(t,i)=>{for(var s in i)e.o(i,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:i[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{RecordTranscribe:()=>c});const i=new function(){let e,t,i=window.AudioContext||window.webkitAudioContext;function s(e){let t=new Event("error");return t.data=new Error("Wrong state for "+e),t}class n{constructor(e){this.stream=e,this.state="inactive",this.em=document.createDocumentFragment(),this.encoder=function(e){let t=e.toString().replace(/^(\(\)\s*=>|function\s*\(\))\s*{/,"").replace(/}$/,""),i=new Blob([t]);return new Worker(URL.createObjectURL(i))}(n.encoder);let t=this;this.encoder.addEventListener("message",(e=>{let i=new Event("dataavailable");i.data=e.data,t.em.dispatchEvent(i),"inactive"===t.state&&t.em.dispatchEvent(new Event("stop"))}))}start(n,r){if("inactive"!==this.state)return this.em.dispatchEvent(s("start"));this.state="recording",this.maxOutputSize=r,e||(e=new i),this.clone=this.stream.clone(),this.input=e.createMediaStreamSource(this.clone),t||(t=e.createScriptProcessor(2048,1,1));let o=this;t.onaudioprocess=function(e){"recording"===o.state&&o.encoder.postMessage(["encode",e.inputBuffer.getChannelData(0)])},this.input.connect(t),t.connect(e.destination),this.em.dispatchEvent(new Event("start")),n&&(this.slicing=setInterval((()=>{"recording"===o.state&&o.requestData()}),n))}getSampleRate(){return e.sampleRate}terminateWorker(){this.encoder.terminate()}stop(){return"inactive"===this.state?this.em.dispatchEvent(s("stop")):(this.requestData(),this.encoder.postMessage(["reset"]),this.state="inactive",this.clone.getTracks().forEach((e=>{e.stop()})),this.clone=null,t.disconnect(e.destination),this.input.disconnect(t),this.input=null,clearInterval(this.slicing))}requestData(){return"inactive"===this.state?this.em.dispatchEvent(s("requestData")):this.encoder.postMessage(["dump",this.maxOutputSize])}addEventListener(...e){this.em.addEventListener(...e)}removeEventListener(...e){this.em.removeEventListener(...e)}dispatchEvent(...e){this.em.dispatchEvent(...e)}}n.notSupported=!navigator.mediaDevices||!i,n.encoder=function(){let e=[];onmessage=t=>{var i=t.data[0];if("encode"===i)!function(t){let i=t.length,s=new Uint8Array(2*i),n=new DataView(s.buffer);for(let e=0;e<i;e++){let i=Math.max(-32768,Math.min(32767,Math.floor(32768*t[e]))),s=2*e;n.setInt16(s,i,!0)}e.push(s)}(t.data[1]);else if("dump"===i){let i=function(t){let i=[],s=0;for(;s<e.length;){let n=0,r=0;for(;s+n<e.length;){let i=e[s+n];if(n>0&&r+i.length>t)break;++n,r+=i.length}let o=new Uint8Array(r),a=0;for(let t=0;t<n;++t){let i=e[s+t];o.set(i,a),a+=i.length}s+=n,i.push(o.buffer)}return e=[],i}(t.data[1]);for(let e=0;e<i.length;++e){let t=i[e];postMessage(t,[t])}}else"reset"===i&&(e=[])}},this.MediaRecorder=n},s=new RegExp("^<([a-zA-Z0-9_\\-]+)> *(([^ ]|$).*)$"),n=Object.freeze({Init:"Init",RequestingMedia:"RequestingMedia",OpeningWebSocket:"OpeningWebSocket",Running:"Running",Finishing:"Finishing",FinishingEarly:"FinishingEarly",Finished:"Finished",Error:"Error",Canceled:"Canceled"}),r=Object.freeze({Init:"Init",RequestingMedia:"Starting",OpeningWebSocket:"Starting",Running:"Running",Finishing:"Finishing",FinishingEarly:"Finishing",Finished:"Finished",Error:"Error",Canceled:"Canceled"});function o(e){return e==n.OpeningWebSocket||e==n.Running||e==n.Finishing}function a(e,t){return Object.freeze({text:e.t,start_ms:e.s,duration_ms:e.d,is_final:t})}let h=!1;class c{constructor(){if(c.notSupported)throw"Soniox Web Voice is not supported on this browser.";this._state=n.Init,this._includeNonFinal=!1,this._apiKey="demo",this._speechContext={},this._onStarted=null,this._onPartialResult=null,this._onFinished=null,this._onError=null,this._webSocketUri="wss://api.soniox.com/transcribe-websocket",this._mediaStream=null,this._mediaRecorder=null,this._mediaRecorderOnStop=null,this._mediaRecorderOnData=null,this._webSocket=null,this._result={words:[],final_proc_time_ms:0,total_proc_time_ms:0}}setIncludeNonFinal(e){if(this._state!=n.Init)throw"setIncludeNonFinal() may only be called before start()";this._includeNonFinal=e}setApiKey(e){if(this._state!=n.Init)throw"setApiKey() may only be called before start()";this._apiKey=e}setSpeechContext(e){if(this._state!=n.Init)throw"setSpeechContext() may only be called before start()";this._speechContext=e}setOnStarted(e){if(this._state!=n.Init)throw"setOnStarted() may only be called before start()";this._onStarted=e}setOnPartialResult(e){if(this._state!=n.Init)throw"setOnPartialResult() may only be called before start()";this._onPartialResult=e}setOnFinished(e){if(this._state!=n.Init)throw"setOnFinished() may only be called before start()";this._onFinished=e}setOnError(e){if(this._state!=n.Init)throw"setOnError() may only be called before start()";this._onError=e}setWebSocketUri(e){if(this._state!=n.Init)throw"setWebSocketUri() may only be called before start()";this._webSocketUri=e}start(){if(this._state!=n.Init)throw"start() may only be called once";if(h)throw"only one RecordTranscribe may be active at a time";navigator.mediaDevices.getUserMedia({audio:!0}).then(this._onGetUserMediaSuccess.bind(this),this._onGetUserMediaError.bind(this)),h=!0,this._state=n.RequestingMedia}stop(){this._state==n.RequestingMedia||this._state==n.OpeningWebSocket?(this._closeResources(),Promise.resolve(!0).then(this._completeFinishingEarly.bind(this)),this._state=n.FinishingEarly):this._state==n.Running&&this._goRunningToFinishing()}cancel(){var e;(e=this._state)!=n.Init&&e!=n.Finished&&e!=n.Error&&e!=n.Canceled&&(this._closeResources(),this._state=n.Canceled,h=!1)}getResult(){return this._result}getResultCopy(){let e=this._result;return Object.freeze({words:Object.freeze(e.words.slice()),final_proc_time_ms:e.final_proc_time_ms,total_proc_time_ms:e.total_proc_time_ms})}getState(){return r[this._state]}_onGetUserMediaSuccess(e){this._state==n.RequestingMedia?(this._mediaStream=e,this._mediaRecorder=new i.MediaRecorder(e),this._mediaRecorderOnStop=this._onMediaRecorderStop.bind(this),this._mediaRecorderOnData=this._onMediaRecorderData.bind(this),this._mediaRecorder.addEventListener("stop",this._mediaRecorderOnStop),this._mediaRecorder.addEventListener("dataavailable",this._mediaRecorderOnData),this._webSocket=new WebSocket(this._webSocketUri),this._webSocket.onopen=this._onWebSocketOpen.bind(this),this._webSocket.onclose=this._onWebSocketClose.bind(this),this._webSocket.onerror=this._onWebSocketError.bind(this),this._webSocket.onmessage=this._onWebSocketMessage.bind(this),this._state=n.OpeningWebSocket):e.getTracks().forEach((function(e){e.stop()}))}_onGetUserMediaError(){this._state==n.RequestingMedia&&this._handleError("get_user_media_failed","Failed to get user media.")}_onMediaRecorderStop(){this._state==n.Running&&this._goRunningToFinishing()}_onMediaRecorderData(e){this._state==n.Running&&this._webSocket.send(e.data)}_onWebSocketOpen(e){this._state==n.OpeningWebSocket&&(this._mediaRecorder.start(100,6e4),this._webSocket.send(JSON.stringify({api_key:this._apiKey,sample_rate_hertz:Math.round(this._mediaRecorder.getSampleRate()),include_nonfinal:this._includeNonFinal,speech_context:this._speechContext})),this._state=n.Running,null!=this._onStarted&&this._onStarted())}_onWebSocketClose(e){if(!o(this._state))return;let t,i;if(1e3==e.code){const r=s.exec(e.reason);if(null!=r){if(t=r[1],i=r[2],"eof"==t){if(this._state==n.Finishing)return void this._handleFinished();t="other_asr_error",i="Unexpected EOF received."}}else t="other_asr_error",i=e.reason}else t="websocket_closed",i="WebSocket closed: code="+e.code+", reason="+e.reason;this._handleError(t,i)}_onWebSocketError(e){o(this._state)&&this._handleError("websocket_error","WebSocket error occurred.")}_onWebSocketMessage(e){if(this._state!=n.Running&&this._state!=n.Finishing)return;const t=function(e){let t=[];return e.fw.forEach((function(e){t.push(a(e,!0))})),e.nfw.forEach((function(e){t.push(a(e,!1))})),Object.freeze({words:Object.freeze(t),final_proc_time_ms:e.fpt,total_proc_time_ms:e.tpt})}(JSON.parse(e.data));this._updateResult(t),null!=this._onPartialResult&&this._onPartialResult(t)}_completeFinishingEarly(e){this._state==n.FinishingEarly&&this._handleFinished()}_closeResources(){this._closeWebSocket(),this._closeMedia()}_closeWebSocket(){null!=this._webSocket&&(this._webSocket.onopen=null,this._webSocket.onclose=null,this._webSocket.onerror=null,this._webSocket.onmessage=null,this._webSocket.close(),this._webSocket=null)}_closeMedia(){null!=this._mediaRecorder&&(this._mediaRecorder.removeEventListener("stop",this._mediaRecorderOnStop),this._mediaRecorder.removeEventListener("dataavailable",this._mediaRecorderOnData),"inactive"!=this._mediaRecorder.state&&this._mediaRecorder.stop(),this._mediaRecorder.terminateWorker(),this._mediaRecorderOnStop=null,this._mediaRecorderOnData=null,this._mediaRecorder=null),null!=this._mediaStream&&(this._mediaStream.getTracks().forEach((function(e){e.stop()})),this._mediaStream=null)}_goRunningToFinishing(){this._closeMedia(),this._webSocket.send(""),this._state=n.Finishing}_handleError(e,t){this._closeResources(),this._state=n.Error,h=!1,null!=this._onError&&this._onError(e,t)}_handleFinished(){this._closeResources(),this._state=n.Finished,h=!1,null!=this._onFinished&&this._onFinished()}_updateResult(e){const t=this._result,i=t.words;for(;i.length>0&&!i[i.length-1].is_final;)i.pop();e.words.forEach((function(e){i.push(e)})),t.final_proc_time_ms=e.final_proc_time_ms,t.total_proc_time_ms=e.total_proc_time_ms}}c.notSupported=i.MediaRecorder.notSupported||!navigator.mediaDevices.getUserMedia||!WebSocket,sonioxWebVoice=t})();