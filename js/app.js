const loadMenuData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    return data;
}

setFullMenu = async () => {
    const data = await loadMenuData();
    const menu = document.getElementById('allMenu');
    const menuArray = [];

    for (const section of data.data.news_category) {
        if (menuArray.indexOf(section.category_name) === -1) {
            menuArray.push(section.category_name);
            const li = document.createElement('li');
            li.innerHTML = `<a id="${section.category_id}">${section.category_name}</a>`;
            menu.appendChild(li);
        }
    }
}

loadNewsData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/category/04');
    const data = await response.json();
    return data;
}
showNewsData = async () => {
    const datas = await loadNewsData();
    for (const data of datas.data) {
        console.log(data)
        const viewData = document.getElementById('showNews');
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl">
                <figure><img class="object-contain w-96" src="${data.image_url}" alt=""></figure>
                <div class="card-body">
                    <h2 class="card-title">${data.title}</h2>
                    <p>${data._id}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Listen</button>
                    </div>
                </div>
            </div>`
        viewData.appendChild(createDiv)
    }





}
showNewsData()
setFullMenu()