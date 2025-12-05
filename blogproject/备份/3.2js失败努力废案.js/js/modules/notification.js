/**
 * 显示一个通知
* @param {Object} config - 配置对象
* @param {string} config.type - 通知类型，可选值：'success', 'error', 'warning', 'info'，默认'info'
* @param {string} config.message - 通知消息内容
* @param {string} [config.title] - 通知标题
* @param {number} [config.duration=3000] - 自动关闭的延迟时间（毫秒），0表示不自动关闭
* @param {string} [config.position='top-right'] - 通知位置，可选值：'top-right', 'top-center', 等
* @param {string} [config.size='medium'] - 通知大小，可选值：'small', 'medium', 'large'
* @param {string} [config.animation='slide-down'] - 动画类型，可选值：'slide-down', 'fade', 'scale'
* @param {boolean} [config.showIcon=true] - 是否显示图标
* @param {boolean} [config.showClose=false] - 是否显示关闭按钮
* @returns {{close: Function}} 返回一个包含close方法的对象，用于手动关闭通知
*/

export function showNotification(config){    
    // 默认配置
    const {
        type = 'info', //  success, error, warning, info
        message,  // 主要消息
        title = '',  // 可选项-内容标题
        position = 'top-right',   // 位置控制
        size = 'medium',   // 大小控制small, medium, large
        animation = 'slide-down',  // 展示动画slide-down, fade, scale
        duration = 3000, // 显示时长（0表示不自动关闭）
        showIcon = true,   // 是否显示提醒图标
        showClose = false,  //  是否显示关闭按钮
    } = config
    
    // 类名构建
    const classes = [
        `notification`,
        `notification-${type}`,
        `notification-${position}`,
        `notification-${size}`,
        `notification-${animation}`,
    ].filter(Boolean).join(' ')    // 可以过滤掉未设置的空项，保留Boolean为true的内容，即有效项
    
    //提醒框创建
    const notification = document.createElement('div')
    notification.className = classes
    // 提醒框内容创建
    const content = document.createElement('div')
    content.className = 'notification-content'
    notification.appendChild(content)

    // 可选项-提醒框内容的标题
    if(title){
        const titleContainer = document.createElement('div')
        titleContainer.className = 'notification-title'
        titleContainer.textContent = title
        content.appendChild(titleContainer)
    }
    // 提醒框内容的信息
    const messageContainer = document.createElement('div')
    messageContainer.className = 'notification-message'
    messageContainer.textContent = message
    content.appendChild(messageContainer)
    console.log('内容存在')

    // 可选项-图标的显示与否
    if(showIcon === true) {
        const iconContainer = document.createElement('div')
        iconContainer.className = 'notification-icon'
        console.log('图案创建了')
        iconContainer.innerHTML = getconSvg(type)
        console.log('图标存在')
        notification.appendChild(iconContainer)
    }

    // 可选项-关闭按钮的显示与否
    if(showClose === true) {
        const closeBtn = document.createElement('div')
        closeBtn.className = 'notification-close'
        closeBtn.textContent = 'x'
        closeBtn.onclick = ()=> closeNotification(notification)
    }
    
    document.body.appendChild(notification)

    // 显示动画
    setTimeout(() => notification.classList.add('show'), 100);
    
    // 自动关闭
    if (duration > 0){
         setTimeout(() => closeNotification(notification), duration);
    }

   
    // 关闭通知函数
    function closeNotification(element) {
        element.classList.remove('show');
        setTimeout(() => element.remove(), 300);
    }
    // 获取图标函数
    function getconSvg(type){
        const icons = {
          success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="#10b981"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
          error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="#ef4444"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
          warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
          info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="#3b82f6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'
        }
        return icons[type] || icons.info;
    }
    
    return { close: () => closeNotification(notification) }
}
