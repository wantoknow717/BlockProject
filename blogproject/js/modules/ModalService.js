export class ModalService {
    static show(config) {
        const {
            type, 
            title, 
            message, 
            buttons, 
            position = 'center',
            hiddenTime = 0
        } = config
       
        const modalContainer = document.getElementById('modal-container')
        // 设置位置
        this.setPosition(modalContainer, position)
        // 设置类型
        modalContainer.setAttribute('modal-type', 'showModal')
        // 设置图标、标题、内容
        document.getElementById('modal-icon-element').innerHTML = this.getIcon(type)
        document.getElementById('modal-title-element').textContent = title
        document.getElementById('modal-message-element').textContent = message
        
        // 按钮的处理
        const footer = document.getElementById('modal-footer-element')
        // 动态生成按钮       
        footer.innerHTML = buttons.map(btn=>
            `<button class="${btn.className}">${btn.text}</button>`
        ).join('')
        // 按钮点击的处理
        footer.querySelectorAll('button').forEach((button, index) => {
            button.onclick = () => {
                // 执行按钮的回调函数（如果有）
                if (buttons[index].onclick) {
                    buttons[index].onclick()
                }
                // 总是关闭弹窗
                this.close(modalContainer)
            }
        })
       
        // 显示模态框
        modalContainer.classList.add('show')

        if(hiddenTime>0){
            setTimeout(()=>this.close(modalContainer), hiddenTime)
        }

    }
    static autoShow(config){
        const {
            type = 'error', 
            title='', 
            hiddenTime = 1000, 
            position = 'center'
        } = config
        const modalContainer = document.getElementById('auto-modal-container')
        // 设置位置
        this.setPosition(modalContainer, position)
        // 设置类型
        modalContainer.setAttribute('modal-type', 'autoModal')
        // 设置图标、标题、内容
        document.getElementById('auto-modal-icon').innerHTML = this.getIcon(type)
        document.getElementById('auto-modal-title').textContent = title
        // 显示模态框
        modalContainer.classList.add('show')
        // 模态框消失
        if(hiddenTime > 0){
            setTimeout(()=>this.close(modalContainer), hiddenTime)
        }
    }
    static close(element){
        element.classList.remove('show')
    }
    static setPosition(modalContainer, position) {
        // 移除之前的位置类
        modalContainer.classList.remove('modal-center', 'modal-top', 'modal-bottom', 'modal-top-left', 'modal-top-right', 'modal-bottom-left', 'modal-bottom-right');
        // 添加新的位置类
        modalContainer.classList.add(`modal-${position}`);
    }
    static getIcon(type){
        const icons = {
            warning:`<svg width="24" height="24" viewBox="0 0 24 24" fill="#f39c12">
                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                    </svg>`,
            success:`<svg width="24" height="24" viewBox="0 0 24 24" fill="#27ae60">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>`,
            error:  `<svg width="24" height="24" viewBox="0 0 24 24" fill="#e74c3c">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>`
        }
        return icons[type] || icons.info
    }
}