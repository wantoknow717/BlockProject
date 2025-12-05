export function show(element, options={}) {
    const {
        showTime = 100, 
        hiddenTime = 2000,
        isAutoHidden = true
    } = options
    setTimeout(()=>element.classList.add('show'), showTime)
    
    if(isAutoHidden){
        // 自动消失
        setTimeout(()=>{
            element.classList.remove('show')
            setTimeout(() => element.remove(), 300)
        },hiddenTime)
    } 
    
}