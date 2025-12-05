export function renderArticleList(articles, containerId){
    const container = document.getElementById(containerId)
    container.innerHTML = articles.map(article=>`
        <article data-id="${article.id}">
            <div class="article-admin-content">
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <time datetime="${article.datetime}">${article.datetime}</time>
            </div>
            <div class="article-admin-actions">
                <button class="edit-btn">编辑</button>
                <button class="delete-btn">删除</button>
            </div> 
        </article>
        `
    ).join('')
}