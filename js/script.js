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
  optArticleTagsSelector = '.post-tags .list',
  optPostAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = '') {
  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';

  /*[DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {
    /*[DONE] get the article id */
    const articleId = article.getAttribute('id');

    /*[DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; // ???
    /*[DONE] get the title from the title element and create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '":><span>' + articleTitle + '</span></a></li>';
    /*[DONE] insert link into titleList */
    // article.insertAdjacentHTML('afterend', linkHTML);
    html = html + linkHTML;
  }
  // console.log(html);
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags){
  const params = {'min': 999999, 'max': 0};
  for(let tag in tags){
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}

function calculateTagClass(count, params){
  //classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /*[DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /*[DONE] START LOOP: for every article: */
  for (let article of articles) {
    /*[DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /*[DONE] make html variable with empty string */
    let html = '';
    /*[DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log('articleTags: ' + articleTags);
    /*[DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log('articleTagsArray: ' + articleTagsArray);
    /*[DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray){
      /*[DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">'+ tag +'</a></li>';
      /*[DONE] add generated code to html variable */
      html = html + linkHTML + ' ';
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    /*[DONE] END LOOP: for each tag */

    /*[DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  } /*[DONE] END LOOP: for every article: */
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
/* [NEW] add html from allTags to tagList */
// tagList.innerHTML = allTags.join(' ');
// console.log(allTags);
// [NEW]
const tagsParams = calculateTagsParams(allTags);
console.log('tagsParams:', tagsParams)
/* [NEW] create variable for all links HTML code */
let allTagsHTML = '';

/* [NEW] START LOOP: for each tag in allTags: */
for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
  allTagsHTML += '<li class="'+ calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ') ' + '</li>';
}
/* [NEW] END LOOP: for each tag in allTags: */

/*[NEW] add HTML from allTagsHTML to tagList */
tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){
  /*[DONE] prevent default action for this event */
  event.preventDefault();
  /*[DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /*[DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /*[DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /*[DONE] find all tag links with class active */
  const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /*[DONE] START LOOP: for each active tag link */
  for (let tagActiveLink of tagActiveLinks) {
    /*[DONE] remove class active */
    tagActiveLink.classList.remove('active');
  } /*[DONE] END LOOP: for each active tag link */

  /*[DONE] find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /*[DONE] START LOOP: for each found tag link */
  for (let tagLink of allTagLinks){
    /*[DONE] add class active */
    tagLink.classList.add('active');
  } /*[DONE] END LOOP: for each found tag link */

  /*[DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /*[DONE] find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /*[DONE] START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /*[DONE] add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  } /*[DONE] END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors(){ /*[DONE] */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorsWrapper = article.querySelector(optPostAuthorSelector);
    let html = '';
    const authorTags = article.getAttribute('data-author');
    const linkHTML = '<a href="'+ authorTags +'">'+ authorTags +'</a>';
    html = html + linkHTML;
    authorsWrapper.innerHTML = 'by' + ' ' + html;
  }
}

generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this; // ???
  const href = clickedElement.getAttribute('href');
  const authorActiveLinks = document.querySelectorAll('.post-author a.active');
  for (let activeLink of authorActiveLinks) {
    activeLink.classList.remove('active');
  }
  const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let authorLink of allAuthorLinks){
    authorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + href + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.post-author a');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
