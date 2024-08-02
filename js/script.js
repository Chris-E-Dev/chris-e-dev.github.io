document.addEventListener("DOMContentLoaded", function() {
    const posts = [
        {
            title: "My First Blog Post",
            link: "posts/first-post.html",
            date: "July 22, 2024",
            content: "Welcome to my blog! This is my first post. Stay tuned for more updates."
        }
        // Add more posts here
    ];

    const postsContainer = document.getElementById('posts');

    function displayPosts(filteredPosts) {
        postsContainer.innerHTML = '';
        filteredPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2><a href="${post.link}">${post.title}</a></h2>
                <p>${post.date}</p>
                <p>${post.content.substring(0, 100)}...</p>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    displayPosts(posts); // Display all posts initially

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
