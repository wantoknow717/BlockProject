export function show(element) {
    setTimeout(()=>element.classList.add('show'),100)
    // 自动消失
    setTimeout(()=>{
        element.classList.remove('show')
        setTimeout(() => element.remove(), 300)
    },2000)
}