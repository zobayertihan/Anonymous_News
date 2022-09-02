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
            <div class="card lg:card-side bg-base-100 shadow-xl my-10">
                <figure><img class="object-contain" src="${data.thumbnail_url}" alt=""></figure>
                <div class="card-body">
                    <h2 class="card-title">${data.title}</h2>
                    <p>${data.details.slice(0, 500)}...</p>
                    <div class="card-actions justify-between">
                        <div class="flex">
                            <figure><img class="object-contain w-12 rounded-full" src="${data.author.img}" alt=""></figure>
                            <div class="ml-2">
                                <p>${data.author.name}</p>
                                <p>${data.author.published_date}</p>
                            </div>
                        </div>
                        <div class="ml-2">
                                <p>Views: ${data.total_view}</p>
                            </div>
                        
                        <label onclick="viewnewsDetails('${data._id}')" for="my-modal-3" class="btn modal-button">Details</label>
                    </div>
                </div>
            </div>`
        viewData.appendChild(createDiv)
    }
}

viewnewsDetails = async (id) => {
    // const url = `https://openapi.programming-hero.com/api/news/${id}`
    // console.log(url);
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
    const datas = await response.json();
    for (const data of datas.data) {
        details = data.details;
        author = data.author;
        thumb = data.image_url;
        // console.log(data.details);
    }
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = ``;
    modalBody.innerHTML = `
    <h2>Author: ${author.name}</h2>
    <img src="${author.img}">
    <p>Published Date: ${author.published_date}</p>
    <img src="${thumb}">
    <p class="py-4">${details}</p>
    `
    console.log(datas);

}
showNewsData()
setFullMenu()