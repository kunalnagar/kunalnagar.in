var filterPosts = debounce(function () {
  var $postLinks = document.querySelectorAll('#posts_list a');
  var searchValue = document
    .getElementById('search')
    .value.trim()
    .toLowerCase();
  $postLinks.forEach(function ($link) {
    if (searchValue.trim() === '') {
      $link.parentNode.classList.remove('is-hidden');
    } else {
      var linkText = $link.textContent.trim().toLowerCase();
      if (linkText.indexOf(searchValue) !== -1) {
        $link.parentNode.classList.remove('is-hidden');
      } else {
        $link.parentNode.classList.add('is-hidden');
      }
    }
  });
}, 250);

function enablePostFiltering() {
  document.getElementById('search').addEventListener('input', filterPosts);
}

function _switchToLightMode() {
  var $html = document.getElementsByTagName('html')[0];
  var $btnToggleColorScheme = document.getElementById('btn_color_scheme');
  $html.classList.remove('dark');
  $html.classList.add('light');
  localStorage.setItem('COLOR_SCHEME', 'light');
  $btnToggleColorScheme.textContent = 'Dark';
}

function _switchToDarkMode() {
  var $html = document.getElementsByTagName('html')[0];
  var $btnToggleColorScheme = document.getElementById('btn_color_scheme');
  $html.classList.remove('light');
  $html.classList.add('dark');
  localStorage.setItem('COLOR_SCHEME', 'dark');
  $btnToggleColorScheme.textContent = 'Light';
}

function handleColorScheme() {
  var $html = document.getElementsByTagName('html')[0];
  var $btnToggleColorScheme = document.getElementById('btn_color_scheme');
  if (localStorage.getItem('COLOR_SCHEME') === null) {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      _switchToDarkMode();
    } else {
      _switchToLightMode();
    }
  } else if (localStorage.getItem('COLOR_SCHEME') === 'light') {
    _switchToLightMode();
  } else if (localStorage.getItem('COLOR_SCHEME') === 'dark') {
    _switchToDarkMode();
  }
  $btnToggleColorScheme.addEventListener('click', function () {
    if ($html.classList.contains('light')) {
      _switchToDarkMode();
    } else {
      _switchToLightMode();
    }
  });
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      const newColorScheme = e.matches ? 'dark' : 'light';
      if (newColorScheme === 'dark') {
        _switchToDarkMode();
      } else {
        _switchToLightMode();
      }
    });
}

function handleCookieMonster() {
  console.info(
    "🍪 Looking for the beloved cookie monster? Run `localStorage.removeItem('AGREE_COOKIE')` and reload the page",
  );
  if (!localStorage.getItem('AGREE_COOKIE')) {
    var $cookieMonsterShell = document.querySelector('.cookie-monster--shell');
    var $cookieMonsterButton = document.querySelector(
      '.cookie-monster--button',
    );
    var $cookieMonsterNotice = document.querySelector(
      '.cookie-monster--notice',
    );
    var $cookieMonsterOhkayButton = document.querySelector(
      '.cookie-monster--notice--button',
    );
    var $main = document.getElementsByTagName('main')[0];
    $cookieMonsterOhkayButton.addEventListener('click', function () {
      localStorage.setItem('AGREE_COOKIE', 'true');
      $main.classList.remove('o--10');
      $main.style.pointerEvents = 'auto';
      $cookieMonsterNotice.classList.remove('show');
      $cookieMonsterShell.classList.remove('show');
    });
    $cookieMonsterButton.addEventListener('click', function () {
      if ($cookieMonsterNotice.classList.contains('show')) {
        $main.classList.remove('o--10');
        $main.style.pointerEvents = 'auto';
        $cookieMonsterNotice.classList.remove('show');
      } else {
        $main.classList.add('o--10');
        $main.style.pointerEvents = 'none';
        $cookieMonsterNotice.classList.add('show');
      }
    });
    setTimeout(function () {
      $cookieMonsterShell.classList.add('show');
    }, 1000);
  }
}

ready(function () {
  var $blogListPage = document.querySelector('.page-blog');
  if ($blogListPage) {
    enablePostFiltering();
  }
  handleCookieMonster();
  handleColorScheme();
});
