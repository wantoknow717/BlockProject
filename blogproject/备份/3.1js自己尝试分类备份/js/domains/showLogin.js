// 这部分包含了具体的UI构建
// 修改为提出通用的模态框组件moduls/notification,设计通用的notification函数，因为它无需维护内部状态，通知是一次性操作
// 此外，对应的样式也无需专门设计login-succeess和login-fail，
// 而是把这些通知样式统一管理，可以放入通用组件类，因为本身在js的函数内涉及专有的html和css样式就不利于统一管理

// 登录成功提醒
import { show } from "../util/show.js"

export function showLoginSuccess(username){
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

    show(modal)
}

// 登录失败提醒
export function showLoginFail(message) {
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

    show(modal)
}