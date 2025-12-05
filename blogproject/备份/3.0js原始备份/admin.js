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

const userLoginList = [
    {username:"张三", password:"123456"},
    {username:"李四", password:"234567"},
    {username:"王五", password:"xcvbnm"},    
]   // 模拟用户列表

function fetchData(userlist){
    return new Promise((resolve,reject)=>{
        console.log("执行了")
        if (!userLoginList) {
            reject(new Error('用户数据加载失败'))
            return
        }

        // 获取用户名，用户密码
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        if(!username || !password){
            reject(new Error(`请输入用户名和密码`))
        }
        
        //  查找是否在用户列表中
        const result = userlist.find(
            user => user.username===username && user.password === password
        )
        // 处理resolve和reject情况
        if(result){
            // resolve(result)
            resolve({
                success:true,
                user:result,
                message:`欢迎回来，${result.username}`
            })
        } else {
            reject(new Error(`用户名或密码错误`))
        }
    })

}

function showLoginSuccess(username){
    // 全dom手写，防止xss注入风险
    const modal = document.createElement('div')
    modal.className = 'modal-success-overlay'
    const content = document.createElement('div')
    content.className = 'modal-success-content'
    // 创建标题行容器
    const header = document.createElement('div')
    header.className = 'modal-success-header'
    
    // 创建成功图标
    const successIcon = document.createElement('div')
    successIcon.className = 'success-icon'
    successIcon.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#27ae60">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
    `    
    // 创建标题
    const title = document.createElement('h3')
    title.textContent = '登录成功'
    
    
    const message = document.createElement('p')
    message.textContent = `欢迎回来，${username}！`
    const button = document.createElement('button')
    button.textContent = '×'
    button.onclick = ()=> modal.remove()

    modal.appendChild(content)
    content.appendChild(header)
    content.appendChild(message)
    content.appendChild(button)
    header.appendChild(successIcon)
    header.appendChild(title)
    document.body.appendChild(modal)

    setTimeout(()=>modal.classList.add('show'),100)
    // 自动消失
    setTimeout(()=>{
        modal.classList.remove('show')
        setTimeout(() => modal.remove(), 300)
    },2000)
}
function showLoginFail(message) {
    const modal = document.createElement('div')
    modal.className = "modal-fail-overlay"
    modal.innerHTML = `
        <div class="modal-fail-content">            
            <div class="error-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#e74c3c">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
            </div>
            <p>${message}</p>
        </div>
    `
    document.body.appendChild(modal)

    setTimeout(()=>modal.classList.add('show'),100)
    // 自动消失
    setTimeout(()=>{
        modal.classList.remove('show')
        setTimeout(() => modal.remove(), 300)
    },2000)
}


const closeElement = document.getElementById('admin-login-form')
closeElement.addEventListener('submit', async function(event) {
    event.preventDefault(); // 阻止表单默认提交行为（页面刷新）
   try{ 
        console.log("表单提交了")

        const data = await fetchData()  //等待表单成功状态
        showLoginSuccess(data.user.username)
        console.log('登录用户:',data.user)
        // 隐藏登录区域,toggle可以切换隐藏/出现状态
        this.closest('#admin-login-section').classList.toggle('hidden')
    } catch(err) {
        showLoginFail(err.message)
        console.log('登录失败!',err.message)
    }
    
});