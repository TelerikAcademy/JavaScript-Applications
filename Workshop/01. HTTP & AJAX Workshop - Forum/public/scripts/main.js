$(() => { // on document ready
  const GLYPH_UP = 'glyphicon-chevron-up',
      GLYPH_DOWN = 'glyphicon-chevron-down',
      root = $('#root'),
      navbar = root.find('nav.navbar'),
      mainNav = navbar.find('#main-nav'),
      contentContainer = root.find('#content'),
      loginForm = $('#login'),
      logoutForm = $('#logout'),
      usernameSpan = $('#span-username'),
      usernameInput = loginForm.find('input'),
      alertTemplate = $($('#alert-template').text());

  (function checkForLoggedUser() {
    data.users.current()
        .then((user) => {
          if (user) {
            usernameSpan.text(user);
            loginForm.addClass('hidden');
            logoutForm.removeClass('hidden');
          }
        });
  })();

  function showMsg(msg, type, cssClass, delay) {
    let container = alertTemplate.clone(true)
                                 .addClass(cssClass).text(`${type}: ${msg}`)
                                 .appendTo(root);

    setTimeout(() => {
      container.remove();
    }, delay || 2000)
  }

  // start threads
  function loadThreadsContent() {
    let container = $($('#threads-container-template').text()),
        threadsContainer = container.find('#threads');

    getThreads()
        .then((threads) => threads.forEach((thread) => {
          let currentThreadUI = getThreadUI(thread);
          threadsContainer.append(currentThreadUI);
        }));

    function getThreads() {
      return data.threads.get()
                 .then((response) => response.result);
    }

    function getThreadUI(thread) {
      let dateString = getDateTimeAgoString(thread.postDate);

      let template = $($('#thread-template').text()).attr('data-id', thread.id),
          threadTitle = template.find('.thread-title').text(thread.title),
          threadCreator = template.find('.thread-creator')
                                  .text(thread.username || 'anonymous'),
          threadDate = template.find('.thread-date').text(dateString);

      return template.clone(true);
    }

    threadsContainer.append(getAddNewThreadUI());

    function getAddNewThreadUI() {
      let template = $($('#thread-new-template').html());
      return template.clone(true);
    }

    contentContainer.find('#container-thraeds').remove();
    contentContainer.html('').prepend(container);
  }

  function loadMessagesContent(threadId) {
    let container = $($('#messages-container-template').text());
    let messagesContainer = container.find('.panel-body');
    container.attr('data-thread-id', threadId);

    getThread(threadId)
        .then(loadThreadMessages);

    function getThread(threadId) {
      return data.threads.getById(threadId)
                 .then((response) => response.result)
                 .catch((err) => showMsg(err, 'Error', 'alert-danger'));
    }

    function loadThreadMessages(thread) {
      container.find('.thread-title').text(thread.title);
      messagesContainer.append(getAddNewMsgUI());

      if (thread.messages && thread.messages.length > 0) {
        thread.messages.forEach((msg) => {
          appendNewMessage(messagesContainer, msg);

        });
      }

      contentContainer.append(container);
    }

    function getAddNewMsgUI() {
      let template = $($('#message-new-template').html());
      return template.clone(true);
    }
  }

  function appendNewMessage(messagesContainer, message) {
    messagesContainer.find('.add-message')
                     .before(getMsgUI(message));
  }

  function getMsgUI(message) {
    let dateString = getDateTimeAgoString(message.postDate);

    let template = $($('#messages-template').text());
    template.find('.message-content').text(message.content);
    template.find('.message-creator').text(message.username || 'anonymous');
    template.find('.message-date').text(dateString);
    return template.clone(true);
  }

  function loadGalleryContent(data) {
    let list = data.data.children,
        containerGallery = $($('#gallery-container-tempalte').text()),
        containerImgs = containerGallery.find('#gallery-imgs'),
        item = $($('#gallery-img-tempalte').text()),
        itemImg = item.find('img.gallery-item-img'),
        itemTitle = item.find('.gallery-item-title')

    list.forEach((el) => {
      itemTitle.text(el.data.title);
      itemImg.attr('src', el.data.thumbnail);

      containerImgs.append(item.clone(true));
    });

    contentContainer.html('').append(containerGallery);
  }

  function getDateTimeAgoString(date) {
    let momentDate = moment(date, 'YYYY-MM-DD HH:mm Z');
    if (momentDate.isValid()) {
      return momentDate.fromNow();
    }
    else {
      return 'on unknown date';
    }
  }

  navbar.on('click', 'li', (ev) => {
    let $target = $(ev.target);
    $target.parents('nav').find('li').removeClass('active');
    $target.parents('li').addClass('active');
  });

  navbar.on('click', '#btn-threads', (ev) => {
    loadThreadsContent();
  });

  contentContainer.on('click', '#btn-add-thread', (ev) => {
    let title = $(ev.target).parents('form').find('input#input-add-thread').val() || null;
    data.threads.add(title)
        .then(loadThreadsContent)
        .then(showMsg('Successfully added the new thread', 'Success', 'alert-success'))
        .catch((err) => showMsg(JSON.parse(err.responseText).err, 'Error', 'alert-danger'));
  });

  contentContainer.on('click', 'a.thread-title', (ev) => {
    let $target = $(ev.target),
        threadId = $target.parents('.thread').attr('data-id');

    loadMessagesContent(threadId);
  });

  contentContainer.on('click', '.btn-add-message', (ev) => {
    let $target = $(ev.target),
        $container = $target.parents('.container-messages'),
        thId = $container.attr('data-thread-id'),
        msg = $container.find('.input-add-message').val();

    data.threads.addMessage(thId, msg)
        .then(appendMessage)
        .then(showMsg('Successfully added the new message', 'Success', 'alert-success'))
        .catch((err) => showMsg(JSON.parse(err.responseText).err, 'Error', 'alert-danger'));

    function appendMessage(result) {
      let last = result.messages.length - 1;
      let message = result.messages[last];

      appendNewMessage($(`[data-thread-id="${thId}"] .panel-body`), message);
    }
  });

  contentContainer.on('click', '.btn-close-msg', (ev) => {
    $(ev.target).parents('.container-messages').remove();
  });

  contentContainer.on('click', '.btn-collapse-msg', (ev) => {
    let $target = $(ev.target);
    if ($target.hasClass(GLYPH_UP)) {
      $target.removeClass(GLYPH_UP).addClass(GLYPH_DOWN);
    }
    else {
      $target.removeClass(GLYPH_DOWN).addClass(GLYPH_UP);
    }

    $target.parents('.container-messages').find('.messages').toggle();
  });
  // end threads

  // start gallery
  navbar.on('click', '#btn-gallery', (ev) => {
    data.gallery.get()
        .then(loadGalleryContent)
        .catch(console.log)
  });
  // end gallery

  // start login/logout
  navbar.on('click', '#btn-login', (ev) => {
    let username = usernameInput.val() || 'anonymous';
    data.users.login(username)
        .then((user) => {
          usernameInput.val('');
          usernameSpan.text(user);
          loginForm.addClass('hidden');
          logoutForm.removeClass('hidden');
        })
  });
  navbar.on('click', '#btn-logout', (ev) => {
    data.users.logout()
        .then(() => {
          usernameSpan.text('');
          loginForm.removeClass('hidden');
          logoutForm.addClass('hidden');
        })
  });
  // end login/logout
});