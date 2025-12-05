//  混合了DOM操作和业务逻辑
//  修改为domains/auth.js只做处理用户名和密码的业务逻辑  + 新增utils/dom.js（增加新函数处理登录相关dom）

export function validateLogin(userlist){
    return new Promise((resolve,reject)=>{
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