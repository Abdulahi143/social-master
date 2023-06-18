const logout = document.querySelector('.logout');
const lastName = document.querySelector('.lastname')
const imageUrl = document.querySelector('#imageUrl')
const title = document.querySelector('#title')
const article = document.querySelector('#article')
const btnPost = document.querySelector('.btn-Post');
const postDisplay = document.querySelector('.posts');

// get user information
const getUserInfoFromLocal = function(){
    let users = localStorage.getItem('userInformation');
    return users ? JSON.parse(users) : [];
}

const userInfo = getUserInfoFromLocal();
lastName.textContent = userInfo.lastName;

logout.addEventListener('click',function(){
    window.location.href = '/log.html'
    localStorage.setItem('userInformation', JSON.stringify(''));
});

const getPosts = function(){
    let posts = localStorage.getItem('posts');
    return posts ? JSON.parse(posts) : [];
}

const articleFun = function(posts){
    const post = getPosts();
    post.push(posts);
    localStorage.setItem('posts', JSON.stringify(post));
}

//Delete Post from localStorage
const deletePost = function(postIndex){
    const posts = getPosts();
    posts.splice(postIndex, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayArticles();
}

btnPost.addEventListener('click',function(e){
    e.preventDefault();
    const aricles = {
        image : imageUrl.value,
        title : title.value,
        article: article.value
    }
    articleFun(aricles);
    console.log('post success');
    imageUrl.value = '';
    title.value = '';
    article.value = '';
    displayArticles();
});

const displayArticles = function(){
    const posts = getPosts();
    postDisplay.innerHTML = '';
    posts.forEach((post, index) => {
        postDisplay.innerHTML += `
            <div class="post">
                <img src="${post.image}" alt="invalid image" srcset="">
                <h2>${post.title}</h2>
                <p>${post.article}</p>
                <button class="deleteButton" onclick="deletePost(${index})">Delete</button>
            </div>
        `;
    });
}

displayArticles();
