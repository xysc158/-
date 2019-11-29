import axios from 'axios'
export default function ajax(url =' ',params={},type='GET'){ // 对外暴露  参数一： url地址， 参数二：需要传递的数据, 参数三： 传递的类型，一般为 get 或者 post
    // 定义 promise 对象 
    let promise
    return new Promise((resolve,reject)=>{
    // 判断请求的方式
    if ('GET'=== type){
        // 拼接请求字符串
        let paramsStr ='';
        Object.keys(params).forEach(key=>{
            paramsStr += key + '=' + params[key] + '&'
        });
        // 过滤最后的&
        if(paramsStr !=''){
            paramsStr= paramsStr.substr(0,paramsStr.lastIndexOf('&')) // 过滤掉 url 地址栏中 参数最后的一个 & 符号 参数一：0 代表从0开始遍历
        }
        // 完整的路径
        url+= '?'+ paramsStr 
        // 发送get请求
        promise= axios.get(url)
    }else if('POST'===type){
        promise= axios.post(url,params)
    }
    // 返回请求的结果
    promise.then((response)=>{
        resolve(response.data)
    }).catch(error=> {
        reject(error)
    })
    })
    
}