const blogList = document.getElementById('blog-list');
const pagination = document.getElementById('pagination');
const blogDetail = document.getElementById('blog-detail');
const detailContent = document.getElementById('detail-content');

const blogs = [
    { title: "Blog Post 1", teaser: "This is a teaser for blog post 1.", file: "blog/blog1.html" },
    { title: "Blog Post 2", teaser: "This is a teaser for blog post 2.", file: "blog/blog2.html" },
	{ title: "Blog Post 3", teaser: "This is a teaser for blog post 3.", file: "blog/blog2.html" },
	{ title: "Blog Post 4", teaser: "This is a teaser for blog post 4.", file: "blog/blog2.html" },
	{ title: "Blog Post 5", teaser: "This is a teaser for blog post 5.", file: "blog/blog2.html" },
	{ title: "Blog Post 6", teaser: "This is a teaser for blog post 6.", file: "blog/blog2.html" },
	{ title: "Blog Post 7", teaser: "This is a teaser for blog post 7.", file: "blog/blog2.html" },
	{ title: "Blog Post 8", teaser: "This is a teaser for blog post 8.", file: "blog/blog2.html" },
	{ title: "Blog Post 9", teaser: "This is a teaser for blog post 9.", file: "blog/blog2.html" },
	{ title: "Blog Post 10", teaser: "This is a teaser for blog post 10.", file: "blog/blog2.html" },
	{ title: "Blog Post 11", teaser: "This is a teaser for blog post 11.", file: "blog/blog2.html" },
    // Add more blog entries here
];

const perPage = 10;
let currentPage = 1;

function renderBlogList() {
    blogList.innerHTML = '';
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const currentBlogs = blogs.slice(start, end);

    currentBlogs.forEach(blog => {
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
    });

    renderPagination();
}

function renderPagination() {
    pagination.innerHTML = '';
    const totalPages = Math.ceil(blogs.length / perPage);

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

window.onload = () => {
    renderBlogList();
};
