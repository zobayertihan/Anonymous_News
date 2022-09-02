const loadMenuData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    return data;
}

setFullMenu = async () => {
    const data = await loadMenuData();
    console.log(data.data.news_category);
    const menu = document.getElementById('allMenu');
    const menuArray = [];

    for (const section of data.data.news_category) {
        console.log(section.category_name);
        if (menuArray.indexOf(section.category_name) === -1) {
            menuArray.push(section.category_name);
            const li = document.createElement('li');
            li.innerHTML = `<a>${section.category_name}</a>`;
            menu.appendChild(li);
        }
    }
}

setFullMenu()