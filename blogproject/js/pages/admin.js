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
import { showLoginSuccess} from "../domains/showLogin.js";
import { articleList } from "../data/articles.js";
import { renderArticleList } from "../domains/articleRender.js";
import { articleFormManager } from "../domains/articleForm.js";
import { ModalService } from "../modules/ModalService.js";
import { articleListManager } from "../domains/articleList.js";

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
        // 显示文章列表区域
        openElement.classList.toggle('hidden')
        // 新建表单
        articleFormManager.init()
        // 
        articleListManager.init()
        
    } catch(err) {
        ModalService.autoShow({
            title:`${err.message}`,
            hiddenTime: 3000,
            position:'top'
        })
        console.log('登录失败!',err.message)
    }
    
});
















// 文章编辑表单(还没做的部分)
// 1. 文章列表根据user.js的列表进行生成，也就是说html的文章列表借助js动态生成
// 2. 保存文章表单时的提醒框（提交成功）和对内容的检验（各项不能为空，如果为空跳出提醒）
// 3. 提交文章后，通过异步（假设没有问题），页面的文章列表出现新文章


