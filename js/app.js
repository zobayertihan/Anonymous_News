const loadMenuData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    return data;
}

setFullMenu = async () => {
    const data = await loadMenuData();
    // console.log(data)
    const menu = document.getElementById('allMenu');
    const menuArray = [];

    for (const section of data.data.news_category) {
        if (menuArray.indexOf(section.category_name) === -1) {
            menuArray.push(section.category_name);
            const li = document.createElement('li');
            li.innerHTML = `<button onclick="loadNewsData('${section.category_id}','${section.category_name}');toggleSpinner(${true})" id="">${section.category_name}</button>`;
            menu.appendChild(li);
        }
    }
}

const loadNewsData = (id, elem) => {
    // console.log(id, elem)
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    // console.log(url);
    // `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showNewsData(data.data, elem))
}
// Default Homepage
loadNewsData("04", "Sports")

const showNewsData = (newses, elem) => {
    // console.log(newses[0])
    const viewData = document.getElementById('showNews');
    viewData.innerHTML = ``;
    const totalNews = newses.length;
    // console.log(totalNews);
    countNews(totalNews, elem)
    const noNewsFound = document.getElementById('no-news-found');
    if (totalNews == 0) {
        noNewsFound.classList.remove('hidden');

    }
    else {
        noNewsFound.classList.add('hidden');
    }
    for (const news of newses) {

        // console.log(news)
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl my-10">
                <figure><img class="object-contain" src="${news.thumbnail_url}" alt=""></figure>
                <div class="card-body">
                    <h2 class="card-title">${news.title}</h2>
                    <p>${news.details.slice(0, 500)}...</p>
                    <div class="card-actions md:flex justify-between grid grid-cols-1">
                        <div class="flex">
                            <figure><img class="object-contain w-12 rounded-full" src="${news.author.img}" alt=""></figure>
                            <div class="ml-2">
                                <p>${news.author.name === null ? "No data Available" : news.author.name}</p>
                                <p>${news.author.published_date === null ? "No data Available" : news.author.published_date}</p>
                            </div>
                        </div>
                        <div class="ml-2">
                                <p>Views: ${news.total_view > 0 ? news.total_view : "No Data Available"}</p>
                            </div>

                        <label onclick="viewnewsDetails('${news._id}')" for="my-modal-3" class="btn modal-button">Details</label>
                    
                    </div>
                </div>
            </div>`
        viewData.appendChild(createDiv)
    }
    toggleSpinner(false);
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
    <h2>Author: ${author.name === null ? "No data Available" : author.name}</h2>
    <img src="${author.img}">
    <p>Published Date: ${author.published_date}</p>
    <img src="${thumb}">
    <p class="py-4">${details}</p>
    `
}
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('hidden');
    }
    else {
        loaderSection.classList.add('hidden')
    }
}

const countNews = (id, elem) => {
    const showContainer = document.getElementById('countNews');
    showContainer.innerHTML = ``;
    const createDiv = document.createElement('div');
    createDiv.innerHTML = `
    <h3 class="text-center">${id} items found in Catagory <span class="font-bold">${elem}</span></h3>
    `
    showContainer.appendChild(createDiv)
}



// showNewsData()
setFullMenu()
