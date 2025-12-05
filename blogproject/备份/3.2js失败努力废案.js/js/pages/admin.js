// 登录区域
// 1、登录页面的出现、消失的控制
//   默认出现，异步等待表单提交状态，成功后消失
// 2、登录时对表单元素的检查和提醒
//   不需要元编程那么麻烦，事件监听就行
// 3、表单的提交
//   点击按钮把表单数据提交给某个地方，并且需要建一个类还是列表来管理本来就有的用户名和密码
// 4. 核验用户名和密码是否是已有的内容，通过后进入文章编辑表单
//    进行判断


// 文章编辑表单
// 1. 文章编辑表单的出现和消失
//   异步等待表单提交状态，成功后进入
// 2. 点击文章列表的编辑按钮，进行编辑（暂不碰）
// 3. 点击文章列表的删除按钮，跳出提示框，进行删除
//    点击事件绑定，这里设置大批类似事件，哦这里可以用到事件委派吧
//    设置一个二次提醒框confirm() 或自定义模态框
// 4. 点击新建文章，出现新建文章的弹窗
//    点击出现
// 5. 在新建文章的弹窗内写入内容，点击确定，进行提交
//    点击确定提交，点击x取消（二次确定）


import { userLoginList } from "../data/user.js"
import { fetchUserData } from "../domains/fetchUserData.js"
import { showNotification } from "../modules/notification.js";

const closeElement = document.getElementById('admin-login-form')
closeElement.addEventListener('submit', async function(event) {
    event.preventDefault(); // 阻止表单默认提交行为（页面刷新）
   try{ 
        console.log("表单提交了")

        const data = await fetchUserData(userLoginList)  //等待表单成功状态
        showNotification({
            type:'success',
            message:`欢迎回来，${data.user.username}`,
            size:'medium',
            position:'top-right',
            duration:0,
            showIcon: true,   
            showClose: true,
        })
        console.log('登录用户:',data.user)
        // 隐藏登录区域,toggle可以切换隐藏/出现状态
        this.closest('#admin-login-section').classList.toggle('hidden')
    } catch(err) {
        showNotification({
            type:'error',
            message:`${err.message}`,
            size:'small',
            position:'top-center',
            duration:0,
            showIcon: true,   
            showClose: false,
        })
        console.log('登录失败!',err.message)
    }
    
});



