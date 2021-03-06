import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });

    // Select the link attribute that contains the selected recipe id
    // Then add the results__link--active class to it
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

export const limitRecipeTitle = (title, limit = 17) => {
    if (title.length > limit) {
        const truncatedTitle = [];
        title.split(' ').reduce((acc, curr) => {
            if (acc + curr.length <= limit) {
                truncatedTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);

        return `${truncatedTitle.join(' ')}...`;
    }
    return title;
};

const renderRecipe = ({image_url, publisher, recipe_id, title}) => {
    // recipe: {
    // image_url:
    // publisher:
    // publisher_url:
    // recipe_id:
    // social_rank:
    // source_url:
    // title:
    // }

    const markup = `
        <li>
            <a class="results__link" href="?#${recipe_id}">
                <figure class="results__fig">
                    <img src="${image_url}" alt="${title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(title)}</h4>
                    <p class="results__author">${publisher}</p>
                </div>
            </a>
        </li>`;

    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next;
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;

    if (page === 1 && pages > 1) {
        // Only show 'next' button
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Show prev' and 'next' button
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }
    else if (page === pages && pages > 1) {
        // Only show 'prev' button on last page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) =>  {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    // forEach will call the renderRecipe for each item in recipes array
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resPerPage);
};
