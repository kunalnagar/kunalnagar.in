var filterPosts = debounce(function () {
  var $postLinks = document.querySelectorAll('#posts_list a');
  var searchValue = document
    .getElementById('search')
    .value.trim()
    .toLowerCase();
  $postLinks.forEach(function ($link) {
    var linkText = $link.textContent.trim().toLowerCase();
    if (linkText.indexOf(searchValue) !== -1) {
      $link.parentNode.style.display = 'auto';
    } else {
      $link.parentNode.style.display = 'none';
    }
  });
}, 250);

function enablePostFiltering() {
  document.getElementById('search').addEventListener('input', filterPosts);
}

ready(function () {
  var $blogListPage = document.querySelector('.page-blog');
  if ($blogListPage) {
    enablePostFiltering();
  }
});
