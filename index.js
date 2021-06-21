'use strict';
const tcb = require("@cloudbase/node-sdk");
// 云函数 SDK / tencent cloudbase sdk
const app = tcb.init({ env: tcb.SYMBOL_CURRENT_ENV })
//自定义api key
const serverkey = 'talk-twikoo'

exports.main = async (event, context) => {
    let apikey = event.queryStringParameters.key
    let content = ''
    if(serverkey == apikey ){
	    let talkcontext = event.queryStringParameters.text
        let talkfrom = event.queryStringParameters.from
        try {
    	    await app.callFunction({
      		    name: 'twikoo',
      		    data: { event: 'TAlK_COMMENT_SUBMIT', talkcontext , talkfrom}
    	    }, { timeout: 300 }) // 设置较短的 timeout 来实现异步
  	    } catch (e) {
    	    console.log('开始异步发送')
  	    }
        content = "异步发送中"
    }else{
        content = "key不匹配"
    }
    return {
        content
    };
};
