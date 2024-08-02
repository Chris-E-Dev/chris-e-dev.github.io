document.addEventListener("DOMContentLoaded", async function() {
    const postsJsonFilePath = "./content/posts.json";
    // const posts = require(postsJsonFilePath);
    // const posts = [
    //     {
    //         title: "My First Blog Post",
    //         link: "posts/first-post.html",
    //         date: "July 22, 2024",
    //         content: "Welcome to my blog! This is my first post. Stay tuned for more updates."
    //     }
    //     // Add more posts here
    // ];

    let posts = [];

    await fetch(postsJsonFilePath)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            posts = json;

            loadPosts();
        } );

    const postsContainer = document.getElementById('posts');

    function displayPosts(filteredPosts) {
        postsContainer.innerHTML = '';
        filteredPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2><a href="${post.link}">${post.title}</a></h2>
                <p>${post.date}</p>
                <p>${post.contentSnippet}</p>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    async function fetchPostContent(post) {
        const response = await fetch(post.link);
        const text = await response.text();
        const html = new DOMParser().parseFromString(text, 'text/html');
        const articleContent = html.querySelector('#article').innerText;
        post.content = articleContent;
        post.contentSnippet = articleContent.substring(0, 100) + '...';
    }

    async function loadPosts() {
        for (let post of posts) {
            await fetchPostContent(post);
        }
        displayPosts(posts); // Display all posts initially
    }

    

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        const filteredPosts = posts.filter(post => {
            return post.title.toLowerCase().includes(query) ||
                   post.content.toLowerCase().includes(query);
        });
        displayPosts(filteredPosts);
    });
});
