import { ModalService } from "../modules/ModalService.js"
import { ArticleService } from "../modules/ArticleService.js"
import { articleListManager } from "./articleList.js"
export const articleFormManager = {
    // 初始化,相当于init:function(){}
    init(){
        this.bindEvents()
    },
    // 绑定事件
    bindEvents(){
        // 新建文章按钮
        document.getElementById('new-article-btn').addEventListener('click', (e)=>{
            this.openCreateForm()
        })
    },
    // 打开创建表单
    openCreateForm(){
        const modal = document.getElementById('article-form-modal')
        modal.classList.add('show')
        // 重置表单
        this.resetForm()
        // 绑定表单内部事件
        this.bindFormEvents()
    },
    // 绑定表单内部事件
    bindFormEvents(){
        const saveBtn = document.getElementById('save-btn')
        const cancelBtn = document.getElementById('cancel-btn')
        const closeBtn = document.getElementById('close-btn')
        const dateTime = document.getElementById('article-date')
        // 优化日期选择，选框即可弹出
        dateTime.addEventListener('click', function() {
            this.showPicker && this.showPicker()
        })
        // 表单提交
        saveBtn.onclick = (e)=>{
            e.preventDefault()
            this.handleSave()
        }
        // 取消提交
        cancelBtn.onclick = ()=>{
            this.handleCancel()
        }
        // 关闭窗口
        closeBtn.onclick = ()=>{
            this.handleCancel()
        }
    },
    // 处理保存
    handleSave(){
        const formData = new FormData(document.getElementById('article-form'))
        const data = Object.fromEntries(formData)  //转化为对象


        // 表单验证
        if(!this.validateForm(data)){
            return
        }
        // 显示确认对话框
        ModalService.show({
            type:'warning',
            title:'是否保存文章并提交？',
            message:'确认要保存并提交该文章吗？',
            buttons:[
                {
                    text:'确定', 
                    className:'confirm-btn',
                    onclick:()=>this.submitForm(data)},
                {
                    text:'取消', 
                    className:'cancel-btn',
                },
            ]
        })
    }, 
    // 处理取消
    handleCancel(){
        // 显示取消对话框
        ModalService.show({
            type: 'warning',
            title: '取消编辑', 
            message: '确定要取消吗，所有数据将不会被保存！',
            buttons: [
                { text: '确定取消', className: 'confirm-btn', onclick: () => this.closeForm() },
                { text: '继续编辑', className: 'cancel-btn' }
            ]
        })
    },
    // 表单验证
    validateForm(data){
        if(!data.title.trim()){
            ModalService.autoShow({
                title:'文章标题不存在，请补充！'
            })
            return false
        }
        if(!data.excerpt.trim()){
            ModalService.autoShow({
                title:"文章简介不存在，请补充！"
            })
            return false
        }
        if(!data.content.trim()){
            ModalService.autoShow({
                title:"文章内容不存在，请补充！"
            })
            return false
        }
        if(!data.datetime){
            ModalService.autoShow({
                title:"请选择发布日期！"
            })
            return false
        }
        return true
    },
    // 表单提交
    async submitForm(data){

        // 补充提交数据相关!!!
        try{
            console.log('正在提交数据',data)
            // 目前提交很快就暂时不补充提交中的提醒框
            await ArticleService.createAricle(data)

            this.triggerListUpdate()

            // 提交成功提醒框
            ModalService.autoShow({
                type: 'success',
                title: '提交成功！',
                hiddenTime: 2000
            })
            this.closeForm()
        } catch(error){
            ModalService.autoShow({
                type: 'error',
                title: '提交失败！',
                hiddenTime: 2000
            })
            const saveBtn = document.getElementById('save-btn')
            saveBtn.disabled = false
        } 
        
    },
    triggerListUpdate(){
        articleListManager.refreshList()
    },
    // 关闭表单
    closeForm(){
        const modal = document.getElementById('article-form-modal')
        modal.classList.remove('show')
    },
    // 重置表单
    resetForm(){
        document.getElementById('article-form').reset()
        document.getElementById('form-title').textContent = '新建文章'
    }
}