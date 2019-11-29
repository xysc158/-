const express = require('express');
const router = express.Router();
const conn = require('./../db/db');
const svgCaptcha= require('svg-captcha');
const sms_util= require('./../util/sms_util');
const md5 = require('blueimp-md5');
let users= {} //用户信息
/**
 * 获取首页轮播图
 */
router.get('/api/homecasual', (req, res)=>{
    // 查询数据库
   let sqlStr = 'select * from pdd_homecasual';
    conn.query(sqlStr, (error, results,fields) => {
        if (error){
            res.json({err_code: 0, message: '请求数据失败'});
        }else {
            res.json({success_code: 200, message: results});
        }
    });
});

/**
 * 获取首页导航
 */
router.get('/api/homenav', (req, res)=>{
   /*
   let sqlStr = 'select * from homenav';
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
        res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
    })
    */
    const data = require('../data/homenav');
    res.json({success_code: 200, message: data});
});

/**
 * 获取首页商品列表
 */
router.get('/api/homeshoplist', (req, res)=>{
    /*
   let sqlStr = 'select * from homeshoplist';
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
        res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
    })
    */
    setTimeout(function () {
         const data = require('../data/shopList');
         res.json({success_code: 200, message: data})
    }, 300);
});

/**
 * 获取推荐商品列表
 * 每次返回20条
 */
router.get('/api/recommendshoplist', (req, res)=>{
    // setTimeout(function () {
    //     const data = require('../data/recommend');
    //     res.json({success_code: 200, message: data})
    // }, 300);
    let pageNo= req.query.page || 1
    let pageSize= req.query.count || 20
    let sqlStr = 'select * from pdd_recommend limit '+(pageNo-1)*pageSize+','+pageSize;
    console.log(pageNo)
    console.log(pageSize)
    console.log(sqlStr)
    conn.query(sqlStr, (error, results,fields) => {
        if (error){
            res.json({err_code: 0, message: '请求数据失败'});
        }else {
            setTimeout(() => {
                res.json({success_code: 200, message: results}); 
            }, 1000);
        }
    });
});

/**
 * 获取推荐商品列表拼单用户
 */
router.get('/api/recommenduser', (req, res)=>{
    setTimeout(function () {
        const data = require('../data/recommend_users');
        res.json({success_code: 200, message: data})
    }, 10);
});

/**
 * 获取搜索分类列表
 */
router.get('/api/searchgoods', (req, res)=>{
    setTimeout(function () {
        const data = require('../data/search');
        res.json({success_code: 200, message: data})
    }, 10);
});

/**
 * 获取商品数据
 */
    router.get('/api/getqalist', (req, res) => {
    const course = req.query.course;
    const limit = req.query.limit || 20;
    const keyword = req.query.keyword || '';
    let sqlStr = 'select * from qa where course= "' + course + '" LIMIT ' + limit;
    if (keyword !== '') {
        sqlStr = 'select * from qa where course= "' + course + '" AND qname LIKE "%' + keyword + '%" LIMIT ' + limit;
    }

    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0});
        res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
    })
});
router.get('/public/images/home/*', function (req, res) {
    res.sendFile( req.url );
    console.log(req.url);
    console.log(__dirname);
});
/*
    一次性图形验证码
*/
router.get('/api/captcha', (req, res) => {
    // 1. 生成随机验证码
    let captcha = svgCaptcha.create({
        color: true,
        noise: 3,
        ignoreChars: '0o1i',
        size: 4
    });
    // 2. 保存
    req.session.captcha = captcha.text.toLocaleLowerCase();
    console.log(req.session)
    // 3. 返回客户端
    res.type('svg');
    res.send(captcha.data);
});
/**
  发送短信验证码
*/
router.get('/api/send_code',(req,res)=>{
    // 获取手机号码
    let phone= req.query.phone
    // 获取随机验证码
    let code = sms_util.randomCode(6)
    /*
    sms_util.sendCode(phone, code, function (success) {
         为获取三方资格
        if(success){
            users[phone]= code;
            res.json({success_code: 200, message: '验证码获取成功！'})
        }else{
            res.json({err_code: 0, message: '验证码获取失败！'})
        }  
    }); */
     // 成功
    setTimeout(() => {
        users[phone]= code
        res.json({success_code: 200, message: code}) 
    }, 2000);
     // 失 败
 /*     setTimeout(() => {
        res.json({err_code: 0, message: '验证码获取失败！'})
    }, 2000); */
    //  res.json({err_code: 0, message: '验证码获取失败！'})
});
/* 
    手机验证码登录
*/
router.post('/api/login_code',(req,res)=>{
    // 获取数据
    const phone= req.body.phone
    const code= req.body.code
    // 验证验证码是否正确
    if(users[phone]!== code){
        res.json({err_code: 0, message: '验证码不正确！'})
        return;
    }
    // 查询
    delete users[phone]
    let sqlStr= "SELECT * FROM pdd_user_info WHERE user_phone = '"+ phone +"'LIMIT 1";
    conn.query(sqlStr, (error, results,fields) => {
        if (error){
            res.json({err_code: 0, message: '请求数据失败'});
        }else {
            results= JSON.parse(JSON.stringify(results))
           if(results[0]){ // 用户已经存在
           
            req.session.userId = results[0].id
            // 返回数据费客户端
            res.json({success_code: 200, message: {id: results[0].id, user_name: results[0].user_name,user_phone: results[0].user_phone,user_sex:results[0].user_sex,user_address:results[0].user_address,user_birthday:results[0].user_birthday,user_sign:results[0].user_sign}})
           }else{ // 新用户
             const addSql= 'INSERT into pdd_user_info(user_name,user_phone) VALUES (?,?)'
             const addSqlParams= [phone,phone]
             conn.query(addSql,addSqlParams,(error, results,fileds) => {
                results= JSON.parse(JSON.stringify(results))
                // console.log(results)
                if(!error){
                    req.session.userId = results.insertId
                    let sqlStr= "SELECT * FROM pdd_user_info WHERE id = '"+ results.insertId +"'LIMIT 1";
                    conn.query(sqlStr, (error, results,fields) => {
                        if(error){
                            res.json({err_code: 0, message: '请求数据失败'});
                        }else {
                            results= JSON.parse(JSON.stringify(results))
                            res.json({success_code: 200, message: {id: results[0].id, user_name: results[0].user_name,user_phone: results[0].user_phone}})
                        }
                    });
                }
            });
           }
        }
    });
});
/* 
    用户名和密码登录
*/
router.post('/api/login_pwd', (req, res) => {
    // 1. 获取数据
    const user_name = req.body.name;
    const user_pwd = md5(req.body.pwd);
    console.log(user_pwd)
    const captcha = req.body.captcha.toLowerCase();
    console.log(req.session)
    // 2. 验证图形验证码是否正确
    if (captcha !== req.session.captcha) {
        res.json({err_code: 0, message: '图形验证码不正确!'});
        return;
    }
    delete req.session.captcha;


    // 3. 查询数据
    let sqlStr = "SELECT * FROM pdd_user_info WHERE user_name = '" + user_name + "' LIMIT 1";
    conn.query(sqlStr, (error, results, fields) => {

        if (error) {
            res.json({err_code: 0, message: '用户名不正确!'});
        } else {
            results = JSON.parse(JSON.stringify(results));
            if (results[0]) {  // 用户已经存在
                // 验证密码是否正确

                if (results[0].user_pwd !== user_pwd) {
                    console.log(typeof results[0].user_pwd, typeof user_pwd)
                    res.json({err_code: 0, message: '密码不正确!'});
                } else {
                    req.session.userId = results[0].id;
                    // 返回数据给客户端
                    res.json({
                        success_code: 200,
                        message: {
                            id: results[0].id,
                            user_name: results[0].user_name,
                            user_phone: results[0].user_phone
                        },
                        info: '登录成功!'
                    });
                }
            } else { // 新用户
                /* const addSql = "INSERT INTO pdd_user_info(user_name, user_pwd) VALUES (?, ?)";
                const addSqlParams = [user_name, user_pwd];
                conn.query(addSql, addSqlParams, (error, results, fields) => {
                    results = JSON.parse(JSON.stringify(results));
                    // console.log(results);
                    if (!error) {
                        req.session.userId = results.insertId;
                        let sqlStr = "SELECT * FROM pdd_user_info WHERE id = '" + results.insertId + "' LIMIT 1";
                        conn.query(sqlStr, (error, results, fields) => {
                            if (error) {
                                res.json({err_code: 0, message: '请求数据失败'});
                            } else {
                                results = JSON.parse(JSON.stringify(results));
                                // 返回数据给客户端
                                res.json({
                                    success_code: 200,
                                    message: {
                                        id: results[0].id,
                                        user_name: results[0].user_name,
                                        user_phone: results[0].user_phone
                                    }
                                });
                            }
                        });
                    }
                }); */
                res.json({err_code: 0, message: '用户不存在，请先通过手机号注册'});
            }
        }
        console.log(req.session);
    });
});
/* 
    根据session中的用户id获取用户信息
*/
router.get('/api/user_info', (req, res)=>{
    let userId= req.session.userId
    let sqlStr = "select * from pdd_user_info where id= ' "+userId+"'limit 1" 
    conn.query(sqlStr, (error, results,fields) => {
        if (error){
            res.json({err_code: 0, message: '请求数据失败'});
        }else {
            results = JSON.parse(JSON.stringify(results))
            if(!results[0]){
                delete req.session.userId
                res.json({
                    err_code: 1,
                    message: '请先登录'
                }
                )
            }else{
                console.log(results)
                res.json({
                    // 返回数据给客户端
                    success_code: 200,
                    message: {id: results[0].id, user_name: results[0].user_name,user_phone: results[0].user_phone,user_sex:results[0].user_sex,user_address:results[0].user_address,user_birthday:results[0].user_birthday,user_sign:results[0].user_sign }
                })
            }
        }
    });
});
/**
 * 退出登录
 */
router.get('/api/logout', (req, res) => {
    // 1. 清除session中userId
    delete  req.session.userId;
    // 2. 提示用户
    res.json({
        success_code: 200,
        message: "退出登录成功"
    });
});

/**
 * 修改用户信息
 */
router.post('/api/change_user_msg', (req, res) => {
    // 1. 获取数据
    const id = req.body.user_id;
    const user_name = req.body.user_name || '';
    const user_sex = req.body.user_sex || '';
    const user_address = req.body.user_address || '';
    const user_birthday = req.body.user_birthday || '';
    const user_sign = req.body.user_sign || '';

    // 2. 验证
    if (!id) {
        res.json({err_code: 0, message: '修改用户信息失败!'});
    }

    // 3. 更新数据
    let sqlStr = "UPDATE pdd_user_info SET user_name = ? , user_sex = ?, user_address = ?, user_birthday = ?, user_sign = ? WHERE id = " + id;
    let strParams = [user_name, user_sex, user_address, user_birthday, user_sign];
    conn.query(sqlStr, strParams, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '修改用户信息失败!'});
        } else {
            res.json({success_code: 200, message: '修改用户信息成功!'});
        }
    });

});

/**
 * 添加商品到购物车
 */
router.post('/api/add_shop_cart', (req, res) => {
    // 1. 验证用户
     let user_id = req.body.user_id;
     if(!user_id || user_id != req.session.userId){
         res.json({err_code:0, message:'非法用户'});
         return;
     }
     let id=req.session.userId
     console.log(id)
    // 2. 获取客户端传过来的商品信息
    let goods_id = req.body.goods_id;
    let goods_name = req.body.goods_name;
    let thumb_url = req.body.thumb_url;
    let price = req.body.price;
    let number = req.body.number;
    let is_pay = 1; // 0 未购买 1购买

    // 3. 查询数据
    let sql_str = "SELECT * FROM pdd_cart WHERE goods_id = '" + goods_id + "' LIMIT 1";
    conn.query(sql_str, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '服务器内部错误!'});
        } else {
            results = JSON.parse(JSON.stringify(results));
            // console.log(results);
            if (results[0]) { // 3.1 商品已经存在
                let buy_count = results[0].buy_count + number;
                let sum = price*0.01*buy_count
                let sql_str = "UPDATE pdd_cart SET buy_count = ? ,buy_sum = ? ,is_pay = 1 WHERE goods_id = '" + goods_id + "'";
                let sums=[buy_count,sum]
                conn.query(sql_str,sums, (error, results, fields) => {
                    if (error) {
                        res.json({err_code: 0, message: '加入购物车失败!'});
                    } else {
                        res.json({success_code: 200, message: '加入购物车成功!'});
                    }
                });
            } else { // 3.2 商品不存在
                let add_sql = "INSERT INTO pdd_cart(id,goods_id, goods_name, thumb_url, price, buy_count, is_pay, buy_sum) VALUES (?, ?, ?, ?, ?, ?, ?,?)";
                let sum = price*0.01* number
                let sql_params = [id,goods_id, goods_name, thumb_url, price, number, is_pay,sum];
                conn.query(add_sql, sql_params, (error, results, fields) => {
                    if (error) {
                        res.json({err_code: 0, message: '加入购物车失败!'});
                    } else {
                        res.json({success_code: 200, message: '加入购物车成功!'});
                    }
                });
            }
        }
    });

});

/**
 * 查询购物车的商品
 */
router.get('/api/cart_goods', (req, res) => {
    // 1.0 获取参数
    if(!req.session.userId){
        res.json({err_code: 0, message: '请先登录!'});
        return;
    }
    let id=req.session.userId
    // 1.1 数据库查询的语句
    let sqlStr = "SELECT * FROM pdd_cart WHERE id = "+id+" ORDER BY  goods_id DESC ";
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '请求数据失败'});
        } else {
            // 返回数据给客户端
            res.json({success_code: 200, message: results});
        }
    });
});
/* 
*  修改购物车数量
*/
router.post('/api/upcount_cart_goods',(req,res)=>{
    // 获取商品 id  修改的数量 
    let id =req.body.goods_id
    let number = parseInt(req.body.buy_count) 
    let price =req.body.price
    let sum = number * price
    console.log(sum)
    // 1.修改购物车商品的数量
    let sqlStr ="UPDATE pdd_cart SET buy_count = ? ,  buy_sum = ?  WHERE goods_id = '" + id + "'";
    let sums=[number,sum]
    console.log(sqlStr)
    conn.query(sqlStr,sums,(error, results, fields)=>{
        if(error){
            res.json({err_code: 0, message: '修改商品数量失败!'})
        }else{
            res.json({success_code: 200, message: '修改商品数量成功!'});
        }
    })
});
router.post('/api/del_cart_goods',(req,res)=>{
    let id = req.body.id
    let sqlStr = "DELETE FROM pdd_cart WHERE goods_id = '" + id + "'"
    conn.query(sqlStr,(error,results,fields)=>{
        if(error){
            res.json({err_code:0,message:"删除失败！"})
        }else{
            res.json({success_code:200,message:"删除成功！"})
        }
    })
})
/* 
    通过id 查询商品信息
*/
router.post('/api/se_cart_goods',(req,res)=>{
    let id = req.body.id
    let sqlStr="SELECT * FROM `pdd_cart` where goods_id = '"+id+"'"
    conn.query(sqlStr,(error,results,fields)=>{
        if(error){
            res.json({err_code:0,message:'查询失败'})
        }else{
            res.json({success_code:200,message:results})
        }
    })
})
/* 
* 搜索界面模糊查询
*/
router.post('/api/search_gooods_like',(req,res)=>{
    let name=req.body.name
    let sqlStr="SELECT * FROM `pdd_recommend` WHERE goods_name LIKE '%"+ name + "%'"
    console.log(sqlStr)
    conn.query(sqlStr,(error,results,fields)=>{
        if(error){
            res.json({err_code:0,message:"查询结果无"})
            console.log(results)
        }else{
            res.json({success_code:200,message:results})
            console.log(results)
        }
    })
}   
)
/* 
*  添加用户地址  
*/
router.post('/api/add_address_info',(req,res)=>{
    let u_id=req.session.userId
    let name=req.body.name
    let address =req.body.adds
    let phone=req.body.phone
    let code = req.body.code
    let status=parseInt(req.body.status) 
    let areaCode=req.body.areaCode
    if(status==1){
        let sqlStrU="UPDATE  pdd_address SET a_default = 0 where a_default = 1"
        conn.query(sqlStrU)
        a()
    }
    else{
        a()
    }
    function a(){
        let sqlStr="INSERT INTO pdd_address(a_name,a_phone,a_address,u_id,a_code,a_default,a_areacode) VALUES( ? , ? , ? , ? , ? , ? , ? )"
        let sqllist=[name,phone,address,u_id,code,status,areaCode]
        conn.query(sqlStr,sqllist,(error,results,fileds)=>{
            if(error){
                res.json({err_code:0,message:'数据库插入失败'})
                console.log(results)
            }else{
                res.json({success_code:200,message:'数据路插入成功'})
            }
          
        })
    }
  
})
/* 
*  查询用户收货地址
*/
router.get('/api/get_address_info',(req,res)=>{
    let u_id = parseInt(req.session.userId) 
    console.log(u_id)
    let sqlStr="SELECT * FROM `pdd_address` WHERE u_id= '" + u_id + "'"
    conn.query(sqlStr,(error,results,fileds)=>{
        if(error){
            res.json({err_code:0,message:'暂未添加地址'})
            console.log(results)
        }else{
            res.json({success_code:200,message:results})
            console.log(results)
        }
    })
})
/* 
*  修改用户地址 
*/
router.post('/api/up_address_info',(req,res)=>{
    let id=req.body.id
    let name=req.body.name
    let tel=req.body.tel
    let address=req.body.address
    let code=req.body.code
    let areacode=req.body.areacode
    let status=req.body.status
    if(status==1){
        let sqlStrU="UPDATE  pdd_address SET a_default = 0 where a_default = 1"
        conn.query(sqlStrU)
        a()
    }else{
        a()
    }
    function a(){
        let sqlStr="UPDATE pdd_address SET a_name= ? ,a_phone= ? , a_address= ? ,a_code= ? ,a_default= ? ,a_areacode= ?  WHERE id = '"+ id + "'"
        let sqlList=[name,tel,address,code,status,areacode]
        conn.query(sqlStr,sqlList,(error,results,fileds)=>{
            if(error){
                res.json({err_code:0,message:'修改失败'})
            }else{
                res.json({success_code:200,message:'修改成功'})
            }
        })
    }
})
/* 
*  删除用户地址
*/
router.post('/api/del_address_info',(req,res)=>{
    let id=req.body.id
    console.log(id)
    let sqlStr="DELETE FROM pdd_address WHERE id = '" +id+"'"
    conn.query(sqlStr,(error,results,fileds)=>{
        if(error){
            res.json({err_code:0,message:'删除失败'})
            console.log(error)
        }else{
            res.json({success_code:200,message:'删除成功'})
            console.log(results)
        }
    })
})
/* 
* 修改用户登录密码
*/
router.post('/api/up_login',(req,res)=>{
    let id=req.session.userId
    let pwd=md5(req.body.pwd)
    let sqlStr="UPDATE pdd_user_info SET user_pwd = '"+pwd+"' WHERE id = '" +id+"'"
    conn.query(sqlStr,(error,results,fileds)=>{
        if(error){
            res.json({err_code:0,message:'修改失败'})
        }else{
            res.json({success_code:200,message:'修改成功'})
        }
    })
})
/* 
*    修改购物车商品是否选中
*/
router.post('/api/up_cart_pay',(req,res)=>{
    let goods_id=req.body.goods_id
    let is_pay=req.body.is_pay
    let id=req.session.userId
    let sqlStr="UPDATE pdd_cart SET is_pay= "+ is_pay +" WHERE goods_id = '"+goods_id+"' and id = '"+id+"'"
    conn.query(sqlStr,(error,results,fileds)=>{
        if(error){
            res.json({err_code:0,message:'修改失败'})
        }else{
            console.log(results)
            res.json({success_code:200,message:results})
        }
    })
})
/* 
* 修改购物车总计
*/
router.get('/api/se_cart_sum',(req,res)=>{
    let id=req.session.userId
    let sqlStr="SELECT SUM(buy_sum)as sum FROM pdd_cart WHERE is_pay = 1 AND id = '"+ id + "'"
    conn.query(sqlStr,(error,results,fileds)=>{
        if(error){
            res.json({err_code:0,message:results})
        }else{
            const result=JSON.parse(JSON.stringify(results)) 
            if(result[0].sum==null){
                result[0].sum=0
            }
            res.json({success_code:200,message:result})
            console.log(result)
        }
    })
})
/* 
* 选中所有商品或者删除所有商品
*/
router.post('/api/all_del',(req,res)=>{
    let is_pay=req.body.is_pay
    let flag=0
    if (is_pay==1){
        flag=0
    }else{
        flag=1
    }
    let sqlStr="UPDATE pdd_cart SET is_pay = "+is_pay+" WHERE is_pay = '" + flag+"'"
    conn.query(sqlStr,(error,results,fileds)=>{
        if(error){
            res.json({err_code:0,message:error})
        }else{
            res.json({success_code:200,message:results})
        }
    })
}),
/* 
*   请求默认地址
*/
router.get('/api/se_address',(req,res)=>{
    let id=req.session.userId
    let sqlStr="SELECT * FROM `pdd_address` WHERE u_id= " +id+" AND a_default=1"
    conn.query(sqlStr,(error,results,fileds)=>{
        if(error){
            res.json({err_code:0,message:results})
        }else{
            res.json({success_code:200,message:results})
        }
    })
}),
router.post('/api/orderform',(req,res)=>{
    let u_id=req.body.u_id
    let goods_id=req.body.goods_id
    let price=req.body.price
    let count=req.body.count
    let shopid=req.body.shopid
    let zhifu=req.body.zhifu
    let a_name=req.body.a_name
    let a_phone=req.body.a_phone
    let a_address=req.body.a_address
    let name=req.body.name
    let list=[u_id,goods_id,price,count,shopid,zhifu,a_name,a_phone,a_address,name]
    let sqlStr="INSERT INTO pdd_orderform(u_id,goods_id,price,count,shopid,zhufu,a_name,a_phone,a_address,name) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )"
    conn.query(sqlStr,list,(error,results,fileds)=>{
        if(error){
            res.json({err_code:0,message:results})
            console.log(error)
        }else{
            res.json({success_code:200,message:results})
            console.log(results)
        }
    })

})
module.exports = router;  
