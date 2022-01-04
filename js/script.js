'use strict';
// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  /*[DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /*[DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  // console.log('clickedElement:', clickedElement);

  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /*[DONE] get 'href' attribute from the clicked link */
  const getHrefValue = clickedElement.getAttribute('href');
  console.log('getHrefValue: ' + getHrefValue);

  /*[DONE] find the correct article using the selector (value of 'href' attribute) */
  const getArticleId = document.querySelector(getHrefValue);
  console.log('targetArticle: ' + getArticleId);

  /*[DONE] add class 'active' to the correct article */
  getArticleId.classList.add('active');

  /* check event info */
  // console.log(event);
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks() {
  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';

  /*[DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    /*[DONE] get the article id */
    const articleId = article.getAttribute('id');

    /*[DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /*[DONE] get the title from the title element and create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '":><span>' + articleTitle + '</span></a></li>';
    /*[DONE] insert link into titleList */
    // article.insertAdjacentHTML('afterend', linkHTML);
    html = html + linkHTML;
  }
  console.log(html);
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  /* find all articles */

  /* START LOOP: for every article: */

    /* find tags wrapper */

    /* make html variable with empty string */

    /* get tags from data-tags attribute */

    /* split tags into array */

    /* START LOOP: for each tag */

      /* generate HTML of the link */

      /* add generated code to html variable */

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
}

generateTags();
