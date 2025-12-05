// 登录区域
// 1、登录页面的出现、消失的控制
//   默认出现，异步等待表单提交状态，成功后消失
// 2、登录时对表单元素的检查和提醒
//   不需要元编程那么麻烦，事件监听就行
// 3、表单的提交
//   点击按钮把表单数据提交给某个地方，并且需要建一个类还是列表来管理本来就有的用户名和密码
// 4. 核验用户名和密码是否是已有的内容，通过后进入文章编辑表单
//    进行判断




import { userLoginList } from "../data/user.js"
import { validateLogin } from "../modules/auth.js";
import { showLoginSuccess, showLoginFail } from "../domains/showLogin.js";

const closeElement = document.getElementById('admin-login-form')

const openElement = document.getElementById('admin-list-section')
openElement.classList.add('hidden')

closeElement.addEventListener('submit', async function(event) {
    event.preventDefault(); // 阻止表单默认提交行为（页面刷新）
    try{ 
        console.log("表单提交了")

        const data = await validateLogin(userLoginList)  //等待表单成功状态
        showLoginSuccess(data.user.username)
        console.log('登录用户:',data.user)
        // 隐藏登录区域,toggle可以切换隐藏/出现状态
        this.closest('#admin-login-section').classList.toggle('hidden')
        openElement.classList.toggle('hidden')
    } catch(err) {
        showLoginFail(err.message)
        console.log('登录失败!',err.message)
    }
    
});

const deleteArticle = document.getElementById('admin-article-list')
deleteArticle.addEventListener('click',(event)=>{
    if(event.target.classList.contains('delete-btn')){
        console.log('找到元素了')
        event.preventDefault()
        const article = event.target.closest('article')
        const titleElement = article.querySelector('h3')
        const title = titleElement.textContent
        console.log('标题是',title)
        const modalConfirm = document.querySelector('.modal-confirm-overlay')
        const confirmBtn = document.querySelector('.modal-confirm .confirm-btn')
        const cancelBtn = document.querySelector('.modal-confirm .cancel-btn')
        const appendTitle = modalConfirm.querySelector('.modal-confirm-body p')
        appendTitle.textContent = `确认要删除${title}文章吗？`
        // document.body.classList.add('modal-confirm-show')

        // 阻止页面滚动的函数
        const preventScroll = (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // 显示对话框时阻止滚动
        document.addEventListener('wheel', preventScroll, { passive: false });
        document.addEventListener('touchmove', preventScroll, { passive: false });

        show(modalConfirm,{
            isAutoHidden: false, 
            button:confirmBtn,
            onButtonClick:()=>{
                event.target.closest('article').remove(),
                // 恢复滚动
                document.removeEventListener('wheel', preventScroll);
                document.removeEventListener('touchmove', preventScroll);
            }
        })
        cancelBtn.onclick = () => {
            modalConfirm.classList.remove('show')
            // 恢复滚动
            document.removeEventListener('wheel', preventScroll);
            document.removeEventListener('touchmove', preventScroll);
        }
        console.log('文章删除成功了')
    } 
})

const newBtn = document.getElementById('new-article-btn')
console.log(newBtn)
newBtn.addEventListener('click',(event)=>{
    event.preventDefault()
    const articleForm = document.getElementById('article-form-modal')
    const saveBtn = document.getElementById('save-btn')
    const cancelBtn = document.getElementById('cancel-btn')

    show(articleForm,{
        isAutoHidden:false,
    })
    saveBtn.onclick = (e)=>{
        e.preventDefault()
        const modalConfirm = document.querySelector('.modal-confirm-overlay')
        const confirmBtn = document.querySelector('.modal-confirm .confirm-btn')
        const cancelBtn = document.querySelector('.modal-confirm .cancel-btn')
        const changeTitle = modalConfirm.querySelector('.modal-confirm-header h3')
        changeTitle.textContent = `是否提交文章？`
        const changeBody = modalConfirm.querySelector('.modal-confirm-body p')
        changeBody.textContent = `确认要对文章进行提交吗？`
        show(modalConfirm,{
            isAutoHidden: false, 
            button:confirmBtn,
            onButtonClick:()=>{
                articleForm.classList.remove('show')
            }
        })
        cancelBtn.onclick = () => {
            modalConfirm.classList.remove('show')
        }        
        //之后补一个保存成功的提示框、以及校验保存内容不能为空
    }
    cancelBtn.onclick = ()=>{
        const modalConfirm = document.querySelector('.modal-confirm-overlay')
        const confirmBtn = document.querySelector('.modal-confirm .confirm-btn')
        const cancelBtn = document.querySelector('.modal-confirm .cancel-btn')
        const changeTitle = modalConfirm.querySelector('.modal-confirm-header h3')
        changeTitle.textContent = `是否取消保存？`
        const changeBody = modalConfirm.querySelector('.modal-confirm-body p')
        changeBody.textContent = `确认要取消对文章的保存吗？`
        show(modalConfirm,{
            isAutoHidden: false, 
            button:confirmBtn,
            onButtonClick:()=>{
                articleForm.classList.remove('show')
            }
        })
        cancelBtn.onclick = () => {
            modalConfirm.classList.remove('show')
        }
    }
})




function show(element, options={}) {
    const {
        showTime = 100, 
        hiddenTime = 2000,
        isAutoHidden = true,
        button = '',
        onButtonClick = null
    } = options
    setTimeout(()=>element.classList.add('show'), showTime)
    // 自动消失或按钮控制
    if(isAutoHidden){
        // 自动消失
        setTimeout(()=>{
            element.classList.remove('show')
        },hiddenTime)
    } else if(button){
        button.onclick=(e)=>{
            e.preventDefault() // 阻止默认行为
            if(onButtonClick){
                onButtonClick()
            }
            element.classList.remove('show')
        }
    }
}
// 文章编辑表单(还没做的部分)
// 1. 文章列表根据user.js的列表进行生成，也就是说html的文章列表借助js动态生成
// 2. 保存文章表单时的提醒框（提交成功）和对内容的检验（各项不能为空，如果为空跳出提醒）
// 3. 提交文章后，通过异步（假设没有问题），页面的文章列表出现新文章


