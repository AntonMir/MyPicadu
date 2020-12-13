'use strict'

document.addEventListener('DOMContentLoaded', () => {
  
  // Создаем переменную, в которую положим кнопку меню
  let menuToggle = document.querySelector('#menu-toggle');
  // Создаем переменную, в которую положим меню
  let menu = document.querySelector('.sidebar');


  const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

  const loginElem = document.querySelector('.login');
  const loginForm = document.querySelector('.login-form');
  const emailInput = document.querySelector('.login-email');
  const passwordInput = document.querySelector('.login-password');
  const loginSingup = document.querySelector('.login-signup');
  const userElem = document.querySelector('.user');
  const userNameElem = document.querySelector('.user-name');

  const exitElem = document.querySelector('.exit');

  const editElem = document.querySelector('.edit');
  const editContainer = document.querySelector('.edit-container');
  
  const editUsername = document.querySelector('.edit-username');
  const editPhotoURL = document.querySelector('.edit-photo');
  const userAvatarElem = document.querySelector('.user-avatar');
  
  const postsWrapper = document.querySelector('.posts');

  // пародия на БД
  const listUsers = [
    {
      id: '01',
      email: 'toshik124@rambler.ru',
      password: '123123',
      displayName: 'AntonJS',
    },
    {
      id: '02',
      email: 'alena@mail.com',
      password: '123123',
      displayName: 'Alenka-LOVE',
    },
  ];

  
  // объект для работы с БД
  const setUsers = {
    user: null, // авторизованный юзер
    // обычные функции, в рамках объекта можно не писать function...
    logIn(email, password, handler) {
      if(!regExpValidEmail.test(email)) {
        console.log(!regExpValidEmail.test(email));
        console.log(email);
        return alert('email не валиден');
      }
      console.log(email, password);
      const user = this.getUser(email);
      if(user && user.password === password) {
        this.authorizedUser(user);
        handler();
        console.log(this.user);
      } else {
        alert('Пользователь с такими данными не найден!')
      }
    },
    logOut(handler) {
      console.log('Выход');
      this.user = null;
      handler();
    },
    signUp(email, password, handler) {
      console.log('Регистрация');

      if(!regExpValidEmail.test(email)) {
        return alert('email не валиден');
      }

      if ( password.length < 4) {
        return alert('Длинна пароля должна составлять не менее 4 символов')
      }
      
      if (!this.getUser(email)) {
        const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
        listUsers.push(user)
        console.log(listUsers);
        this.authorizedUser(user);
        handler();
      } else {
        alert('Пользователь уже зареган')
      }
    },
    editUser(userName, userPhoto, handler) {

      if (userName) {
        this.user.displayName = userName;
      }

      if (userPhoto) {
        this.user.photo = userPhoto;
      }

      handler();
    },
    getUser(email) {
      return listUsers.find(item => item.email === email)
    },
    authorizedUser(user) {
      this.user = user;
    } 
  }

  // смена экрана регистрации на окно залогиненного пользователя и обратно
  //  зависит от того, есть ли в setUsers.user залогиненый пользователь
  const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log('user: ', user);
    
    if (user) {
      loginElem.style.display = 'none';
      userElem.style.display = '';
      userNameElem.textContent = user.displayName;
      userAvatarElem.src = user.photo ? user.photo : userAvatarElem.src;
    } else {
      loginElem.style.display = '';
      userElem.style.display = 'none';
    }
  }


  const setPosts = {
    allPosts: [
      {
        title: 'Заголовок поста',
        text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
        tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
        author: 'toshik124@rambler.ru',
        date: '11.11.2020, 20:54:00',
        like: 15,
        comments: 20,
      },
      {
        title: 'Заголовок поста2',
        text: 'Послушай, там далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
        tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
        author: 'alena@mail.com',
        date: '11.11.2020, 20:54:00',
        like: 45,
        comments: 12,
      }
    ],



  }



  // содержимое постов
  const showAllPosts = () => {

    let postsHTML = '';

    setPosts.allPosts.forEach((post) => {

      const {title, text, tags, author, date, like, comments} = post;

      let tagsList = '';
      tags.map((el) => {
        tagsArr += `<li class="tag"><a href="#">#${el}</a></li>`;
        return tagsList;
      })      

      postsHTML += `
      <!-- ТЕКСТ ПОСТА С ЗАГОЛОВКОМ -->
      <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${text}</p>

          <!-- ТЭГИ ПОД ПОСТОМ -->
          <ul class="tags">
          ${tagsList}
          </ul> 
        </div>

        <div class="post-footer">
          <!-- ЛАЙК + КОММЕНТ + СОХРАНИТЬ + ОТПРАВИТЬ -->
          <div class="post-buttons">
            <button class="post-button like">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="../static/img/icons.svg#like"></use>
              </svg>
              <span class="like-counter">${like}</span>
            </button>
            <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="../static/img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">${comments}</span>
            </button>
            <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="../static/img/icons.svg#save"></use>
              </svg>
            </button>
            <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="../static/img/icons.svg#share"></use>
              </svg>
            </button>
          </div>

          <!-- АВТОР ПОСТА - ПРАВО-НИЗ -->
          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">${author.substring(0, author.indexOf('@'))}</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link">
              <img src="../static/img/avatar.jpeg" alt="avatar" class="author-avatar">
            </a>
          </div>
          
        </div>
        <!-- /.post-body -->

      </section>
      <!-- /.post -->
      `;
    })


    postsWrapper.innerHTML = postsHTML;
  };
  



  // инициализация все функций
  const init = () => {
    
  // отслеживаем клик по кнопке меню и запускаем функцию 
  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
  })

  // Вход
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
    editContainer.classList.remove('visible');
  })

  // Регистрация
  loginSingup.addEventListener('click', (event) => {
    event.preventDefault();
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
    editContainer.classList.remove('visible');
  })

     // РАЗЛОГИН
   exitElem.addEventListener('click', (event) => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  })

  //показать/скрыть "РЕДАКТИРОВАНИЕ"
  editElem.addEventListener('click', (event) => {

    // подставляем значения ЮЗЕРА в поля редактирования
    if (editUsername.value !== setUsers.user.displayName) {
      editUsername.value = setUsers.user.displayName;
    }    
    
    if (editPhotoURL.value !== userAvatarElem.src) {
      editPhotoURL.value = userAvatarElem.src;
    }    

    event.preventDefault();
    editContainer.classList.toggle('visible');
  })

  // Сохраняем новый логин и новую фотку
  editContainer.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  })
    showAllPosts();
    toggleAuthDom();
  }


  init();
})

