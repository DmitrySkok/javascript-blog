'use strict'
// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    /*[DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
        for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /*[DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    // console.log('clickedElement:', clickedElement);

    /*[DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
        for(let activeArticle of activeArticles){
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
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }