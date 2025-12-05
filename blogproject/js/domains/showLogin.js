
// 登录成功提醒
import { show } from "../util/show.js"

export function showLoginSuccess(username){
    const modal = document.querySelector('.modal-success-overlay')
    const message = document.querySelector('.modal-success-content p')
    message.textContent = `欢迎回来，${username}！`
    const button = document.querySelector('.modal-success-content button')
    button.onclick = ()=> modal.remove()
    show(modal)
}
