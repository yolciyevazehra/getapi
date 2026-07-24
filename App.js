let productlist = document.getElementById('productlist');
let categorylist = document.getElementById('categorylist');
let userlist = document.getElementById('userlist');
let BASE_API = 'https://fakestoreapi.com';


function getShowData(category = '') {

    productlist.innerHTML = '';


    let url = category && category !== 'all' 
        ? `${BASE_API}/products/category/${category}` 
        : `${BASE_API}/products`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(item => {
                productlist.innerHTML += `
                    <li id="${item.id}" class="bg-white shadow-sm border border-slate-200 rounded-lg p-3">
                        <a href="#" class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                            <div class="aspect-[12/11] bg-gray-100 rounded-lg p-4">
                                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-contain" />
                            </div>

                            <div class="flex gap-2 mt-4">
                                <h3 class="text-base font-semibold text-slate-900 line-clamp-1">${item.title}</h3>
                                <p class="text-base text-slate-900 font-bold ml-auto">$${item.price}</p>
                            </div>
                            <p class="text-slate-600 text-sm mt-2 leading-relaxed">
                                <span class="font-semibold">Kateqoriya:</span> ${item.category}
                            </p>
                            <p class="text-slate-600 text-sm mt-2 line-clamp-2 leading-relaxed">${item.description}</p>
                        </a>
                        <div class="flex items-center gap-2 mt-6">
                            <button type="button" class="w-full cursor-pointer text-sm px-3.5 py-2 font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 transition-colors">
                                Add to cart
                            </button>
                            <button type="button" class="border border-slate-300 hover:bg-gray-50 w-12 h-9 flex items-center justify-center rounded-md cursor-pointer" title="Wishlist">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-4 fill-pink-700" viewBox="0 0 64 64" aria-hidden="true">
                                    <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
                                </svg>
                            </button>
                        </div>
                    </li>
                `;
            });
        });
}


function getCategories() {
    fetch(`${BASE_API}/products/categories`)
        .then(res => res.json())
        .then(categories => {
            categories.forEach(category => {
                categorylist.innerHTML += `
                    <li data-category="${category}" class="category-item border border-slate-300 bg-slate-800 text-white rounded-md px-4 py-2 cursor-pointer hover:bg-slate-700 transition-colors capitalize">
                        ${category}
                    </li>
                `;
            });


            let items = document.querySelectorAll('.category-item');
            items.forEach(btn => {
                btn.addEventListener('click', function () {
                    let catName = this.getAttribute('data-category');
                    getShowData(catName);
                });
            });
        });
}


function showUser() {
    if (!userlist) return; 
    fetch(`${BASE_API}/users`)
        .then(res => res.json())
        .then(res => res.map((item) => {
            userlist.innerHTML += `<li class="border p-2 text-white text-xl">${item.username}</li>`;
        }));
}


let allCategoryBtn = categorylist.querySelector('li');
if (allCategoryBtn) {
    allCategoryBtn.classList.add('cursor-pointer');
    allCategoryBtn.addEventListener('click', () => getShowData('all'));
}


getShowData();
getCategories();
showUser();