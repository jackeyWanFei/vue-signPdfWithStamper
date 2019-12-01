import request from '@/utils/request'
const BASE_API = process.env.BASE_API;

/**
 * BASE_URL 定义在webpack.prod.conf.js / webpack.dev.conf.js 中
 * */

export const MH_API = {
  // 接口示例，第一个接口
  serverLogin (params) {
    return request({
      url: `${BASE_API}/app/login`,
      method: 'post',
      data: params,

    })
  },
//  首页获取区块数据 http://ctsign.cn/Web/txCertification/companyCertification
  indexGetBlock (params) {
    // console.log( `${BASE_API}/wallet/blockPage`)
    return  `${BASE_API}`;
  },
  ownRenzheng (params) {
  	//https://ctsign.cn/Web/txCertification/detectAuth
  	//http://192.168.1.161:8080/Web/txCertification/detectAuth
    return request({
      url: `https://ctsign.cn/Web/txCertification/detectAuth`,
      method: 'POST',
      data: params
    })
  },
  cutShortUrl(params){
  	return request({
		  url: `https://ctsign.cn/open/shortUrl?url=`+params.url,
		  method:'POST',
		  data: params,
			headers:{
						'Token':'e4b4de4d57b974a1c6de3514a7eba331'
			}
		 })
  },
	companyRZ (params) {
		//https://ctsign.cn/Web/txCertification/companyCertification
		//http://192.168.1.161:8080/Web/txCertification/companyCertification
    return request({
      url: `https://ctsign.cn/Web/txCertification/companyCertification`,
      method: 'post',
      data: params
    })
  },
	ipfsSend (params) {
    return request({
      url: `https://ctsign.cn/Web/ipfs/cluster/pins?hash=`+params.path,
      method: 'get',
      data: params
    })
 },
 	seekShiming (params) {
 		console.log(params)
    return request({
      url: `https://www.ctsign.cn/Web/txCertification/checkCertification?address=`+params.address+'&realName='+params.name+'&number='+params.number,
      method: 'get',
      data: params
    })
  },
 	getShiming (params) {
    return request({
      url: `https://www.ctsign.cn/Web/txCertification/getCertificationByAddress?address=`+params.address,
      method: 'get',
      data: params
    })
  },
 	getContractType (params) {
    return request({
      url: `https://www.ctsign.cn/block/browser/contractDetail?address=`+params.address,
      method: 'get',
      data: params
    })
  },
 	recharge (params) {
    let url = `https://ctsign.cn/Web/aliPay/toPay?address=`+params.address+'&money='+params.money+'&type='+params.type;
    if(params.sellerId) {
      url += `&sellerId=${params.sellerId}`
    }
    if(params.packageId) {
      url += `&packageId=${params.packageId}`
    }
    return request({
      url: url,
      method: 'get',
      data: params
    })
  },
 	rechargeWx (params) {
    let url = `https://ctsign.cn/Web/txPay/toPay?subject=黔易支付&address=${params.address}&money=` + params.money+'&code='+params.code+'&type='+params.type;
    if(params.sellerId) {
      url += `&sellerId=${params.sellerId}`
    }
    if(params.packageId) {
      url += `&packageId=${params.packageId}`
    }
    return request({
      url: url,
      method: 'get',
      data: params
    })
  },
	config (params) {
    return request({
      url: `https://ctsign.cn/Web/txPay/config?url=`+params.url,
      method: 'get',
      data: params
    })
  },
 	seekRecharge (params) {
    return request({
      url: `https://ctsign.cn/Web/txPay/getChargeByOrderId?orderId=`+params.orderId,
      method: 'get',
      data: params
    })
  },
 	getPeoInfo (params) {
    return request({
      url: `https://ctsign.cn/blockChain`,
      method: 'POST',
      data: params
    })
  },
 	getTeadeNum (params) {
    return request({
      url: 'https://ctsign.cn/block/browser/statisticsTransaction?type='+params.num,
      method: 'GET',
      data: params,
      headers:{
      	'content-type':'application/x-www-form-urlencoded'
      }
    })
  },
 	getCheckNum (params) {
    return request({
      url: 'https://ctsign.cn/Web/randMessage/sendMessage?mobile='+params.photo,
      method: 'GET',
      data: params,
      headers:{
      	'content-type':'application/x-www-form-urlencoded'
      }
    })
  },

 	getUnivalence () {
    return request({
      url: 'https://ctsign.cn/Web/dictManager/getDictByGroup?key=RMB_FEE',
      method: 'GET',
      headers:{
      	'content-type':'application/x-www-form-urlencoded'
      }
    })
  },
 	getGasprice () {
    return request({
      url: 'https://ctsign.cn/Web/dictManager/getDictByGroup?key=FEE',
      method: 'GET',
      headers:{
      	'content-type':'application/x-www-form-urlencoded'
      }
    })
  },
	jiebang (params) {
    return request({
      url: `https://ctsign.cn/Web/txCertification/delete?address=`+params.address,
      method: 'get',
      headers:{
      	'content-type':'application/x-www-form-urlencoded'
      }
    })
  },
 	ceshi (params) {
    return request({
      url: params.url,
      method: 'GET',
      data: params,
      headers:{
      	'content-type':'application/x-www-form-urlencoded'
      }
    })
  },
 	getPackageList (params) {
    return request({
      url: `${BASE_URL}/Web/mobile/common/getPackageList`,
      method: 'GET',
      data: params,
      headers:{
      	'content-type':'application/x-www-form-urlencoded'
      }
    })
  }

};
// Web/txCertification/getCertificationByAddress
