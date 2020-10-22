//根据服务器用户返回的menuList数据和allRoutes进行匹配，得到符合当前用户的有效路由配置

// const { default: allRoutes } = require("../router/AllRoutes");

/**
 * 
 * @param {Array} allRoutes  用户的有效的完整路由配置
 * @param {Array} menuList   服务器返回的用户菜单名字
 */
import allRoutes from "../router/allRoutes"
const recursionRoutes = (allRoutes, menuList) => {
    let userRoutes = []
    // allRoutes遍历 需要和menuList里一个一个的匹配
    allRoutes.forEach(item => {
        menuList.forEach(v => {
            //外层循环
            if (item.meta.name === v.name) {
                //内存循环
                //必须是个数组才能用forEach
                // if (v.children && Array.isArray(v.children)){ //严谨的写
                if (v.children && v.children.length > 0) { //不严谨的写
                    item.children = recursionRoutes(item.children, v.children)  //递归
                }
                userRoutes.push(item)
            }
        })
    })
    return userRoutes
}
/* 调试用的 
let menuList = [
    {
        "name": "管理首页"
    },
    {
        "name": "学员管理",
        "children": [
            {
                "name": "学员项目管理"
            }
        ]
    },
    {
        "name": "我的中心"
    }
]
console.log(recursionRoutes(allRoutes, menuList)); */
export default recursionRoutes 