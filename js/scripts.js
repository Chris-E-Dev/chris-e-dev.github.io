
const blogs = [
    { title: "Blog Post 1", teaser: "This is a teaser for blog post 1.", file: "blog/blog1.html", tags: ["tech", "javascript"] },
    { title: "Blog Post 2", teaser: "This is a teaser for blog post 2.", file: "blog/blog2.html", tags: ["life", "travel"] },
	{ title: "Blog Post 3", teaser: "This is a teaser for blog post 3.", file: "blog/blog3.html", tags: ["tech", "javascript"] },
	{ title: "Blog Post 4", teaser: "This is a teaser for blog post 4.", file: "blog/blog4.html", tags: ["tech", "C#"] },
	{ title: "Blog Post 5", teaser: "This is a teaser for blog post 5.", file: "blog/blog2.html", tags: ["tech", "C++"] },
	{ title: "Blog Post 6", teaser: "This is a teaser for blog post 6.", file: "blog/blog2.html", tags: ["tech", "html"] },
	{ title: "Blog Post 7", teaser: "This is a teaser for blog post 7.", file: "blog/blog2.html", tags: ["tech", "javascript"] },
	{ title: "Blog Post 8", teaser: "This is a teaser for blog post 8.", file: "blog/blog2.html", tags: ["tech", "general"] },
	{ title: "Blog Post 9", teaser: "This is a teaser for blog post 9.", file: "blog/blog2.html", tags: ["tech", "javascript"] },
	{ title: "Blog Post 10", teaser: "This is a teaser for blog post 10.", file: "blog/blog2.html", tags: ["tech", "javascript"] },
	{ title: "Blog Post 11", teaser: "This is a teaser for blog post 11.", file: "blog/blog2.html", tags: ["tech", "javascript"] },
    // Add more blog entries here
];

const blogList = document.getElementById('blog-list');
const pagination = document.getElementById('pagination');
const blogDetail = document.getElementById('blog-detail');
const detailContent = document.getElementById('detail-content');
const searchInput = document.getElementById('search-input');
const tagFilter = document.getElementById('tag-filter');

const tags = new Set();
blogs.forEach(blog => blog.tags.forEach(tag => tags.add(tag)));

let filteredBlogs = [...blogs];
let activeTags = new Set();
const perPage = 10;
let currentPage = 1;

async function fetchBlogContent(blog) {
    const response = await fetch(blog.file);
    const text = await response.text();
    return text;
}

async function renderBlogList() {
    blogList.innerHTML = '';
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const currentBlogs = filteredBlogs.slice(start, end);

    for (const blog of currentBlogs) {
        const article = document.createElement('article');
        const title = document.createElement('h2');
        const teaser = document.createElement('p');
        const link = document.createElement('a');

        title.textContent = blog.title;
        teaser.textContent = blog.teaser;
        link.textContent = "Read more";
        link.href = `#${blog.title}`;
        link.onclick = (e) => {
            e.preventDefault();
            loadBlogDetail(blog.file);
        };

        article.appendChild(title);
        article.appendChild(teaser);
        article.appendChild(link);
        blogList.appendChild(article);
    }

    renderPagination();
}

function renderPagination() {
    pagination.innerHTML = '';
    const totalPages = Math.ceil(filteredBlogs.length / perPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            currentPage = i;
            renderBlogList();
        };

        if (i === currentPage) {
            button.disabled = true;
        }

        pagination.appendChild(button);
    }
}

function loadBlogDetail(file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            detailContent.innerHTML = data;
            blogList.classList.add('hidden');
            pagination.classList.add('hidden');
            blogDetail.classList.remove('hidden');
        });
}

function closeDetail() {
    blogList.classList.remove('hidden');
    pagination.classList.remove('hidden');
    blogDetail.classList.add('hidden');
    detailContent.innerHTML = '';
}

async function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const searchWords = query.split(/\s+/).filter(word => word.length > 0);
    filteredBlogs = [];

    for (const blog of blogs) {
        const blogContent = await fetchBlogContent(blog);
        const textToSearch = `${blog.title.toLowerCase()} ${blog.teaser.toLowerCase()} ${blogContent.toLowerCase()}`;

        if (searchWords.every(word => textToSearch.includes(word)) &&
            (activeTags.size === 0 || blog.tags.some(tag => activeTags.has(tag)))) {
            filteredBlogs.push(blog);
        }
    }

    currentPage = 1;
    renderBlogList();
}

function handleTagFilter() {
    activeTags = new Set(
        Array.from(document.querySelectorAll('input[type=checkbox]:checked'))
        .map(checkbox => checkbox.value)
    );
    handleSearch(); // Reuse the search function to apply tag filters as well
}

function renderTagFilter() {
    tagFilter.innerHTML = '<h2>Filter by tags</h2>';
    tags.forEach(tag => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = tag;
        checkbox.onchange = handleTagFilter;

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(tag));
        tagFilter.appendChild(label);
        tagFilter.appendChild(document.createElement('br'));
    });
}

searchInput.addEventListener('input', handleSearch);

window.onload = () => {
    renderTagFilter();
    renderBlogList();
};
