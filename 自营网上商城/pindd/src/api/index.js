import ajax from './ajax'
// 1. 基础路径
const BASE_URL='/api'
//    请求方法

//   请求首页轮播图
export const getHomeCasual = ()=>ajax(BASE_URL+'/api/homecasual');
//  请求首页的导航
export const getHomeNav = ()=>ajax(BASE_URL+'/api/homenav');
//  请求首页的商品列表
export const getHomeShopList= ()=>ajax(BASE_URL+'/api/homeshoplist')
//  推荐商品的数据
export const getRecommendShopList=(params)=>ajax(BASE_URL+'/api/recommendshoplist',params)
// 请求搜索列表的数据
export const getSearchGoods=()=>ajax(BASE_URL+'/api/searchgoods')
// 请求短信验证码
export const getPhoneCode=(phone)=>ajax(BASE_URL+'/api/send_code',{phone})
// 手机验证码登录
export const phoneCodeLogin=(phone,code)=>ajax(BASE_URL+'/api/login_code',{phone,code},'POST')
// 用户名和密码登录
export const pwdLogin=(name,pwd,captcha)=>ajax(BASE_URL+'/api/login_pwd',{name,pwd,captcha},'POST')
// 获取登录的用户信息
export const getUserInfo=()=>ajax(BASE_URL+'/api/user_info')
// 退出登录
export const getLogout = () => ajax(BASE_URL + '/api/logout');
// 修改用户信息
export const changeUserInfo = (user_id, user_name, user_sex, user_address, user_birthday, user_sign) => ajax(BASE_URL + '/api/change_user_msg', {
    user_id,
    user_name,
    user_sex,
    user_address,
    user_birthday,
    user_sign
  }, 'POST');
// 加入购物车
export const addGoodsToCart = (user_id, goods_id, goods_name, thumb_url, price,number) => ajax(BASE_URL + '/api/add_shop_cart', {user_id, goods_id, goods_name, thumb_url, price,number}, 'POST');
// 请求购物车的数据
export const getCartsGoods = () => ajax(BASE_URL + '/api/cart_goods');
// 修改购物车商品数量
export const upCartsGoods = (goods_id,buy_count,price) => ajax(BASE_URL + '/api/upcount_cart_goods',{goods_id,buy_count,price},'POST');
// 删除购物车信息
export const delCartsGoods = (id) => ajax(BASE_URL + '/api/del_cart_goods',{id},'POST');
// 
export const getseCartsGoods = (id) => ajax(BASE_URL + '/api/se_cart_goods',{id},'POST');
// 搜索页面的模糊查询
export const searchgooodslike = (name) => ajax(BASE_URL + '/api/search_gooods_like',{name},'POST');
// 用户地址插入
export const addAddress1 = (name,phone,adds,code,status,areaCode) => ajax(BASE_URL + '/api/add_address_info',{name,phone,adds,code,status,areaCode},'POST');
// 查询用户地址
export const  getAddressInfo = () => ajax(BASE_URL + '/api/get_address_info');
// 修改用户地址
export const  upAddressInfo = (id,name,tel,address,code,status,areacode) => ajax(BASE_URL + '/api/up_address_info',{id,name,tel,address,code,status,areacode},'POST');
// 删除用户地址
export const  delAddressInfo = (id) => ajax(BASE_URL + '/api/del_address_info',{id},'POST');
// 修改用户密码
export const upUserLogin = (pwd) => ajax(BASE_URL + '/api/up_login',{pwd},'POST');
// 修改购物车商品选中状态
export const upCartpay = (goods_id,is_pay) => ajax(BASE_URL + '/api/up_cart_pay',{goods_id,is_pay},'POST');
// 查询购物车商品选中状态
export const seCartSum = () => ajax(BASE_URL + '/api/se_cart_sum');
export const allDel = (is_pay) => ajax(BASE_URL + '/api/all_del',{is_pay},'POST');
// 请求默认地址
export const seaddress = () => ajax(BASE_URL + '/api/se_address');
// Aplipay
export const aplipay = (data) => ajax('http://localhost/alipay/wappay/pay.php',data,'POST');
export const reorderform = (u_id,goods_id,price,count,shopid,zhifu,a_name,a_phone,a_address,name) => ajax(BASE_URL + '/api/orderform',{u_id,goods_id,price,count,shopid,zhifu,a_name,a_phone,a_address,name},'POST');