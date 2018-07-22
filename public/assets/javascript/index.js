
$(document).ready(function() {
    //ads event listeners for saving and scraping. article container div


    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    //run init
    initPage();

    function initPage() {
        //run ajax for unsaved articles 
        articleContainer.empty();
        $.get("/api/headlines?saved=false")
        .then (function(data) {
           //render headlines to the page
if (data && data.length) {
    renderArticles(data);
}
else{
    //or render message of no new articles 
    renderEmpty();
        }
    });
 }

 function renderArticles(articles) {
     //using JSoN to provide articles int he database

     var articlePanels = [];
     //pasing articles as JSON object to a function that gives us boostrap with the article data inside a panel

     for (var i = 0; i < articles.length; i++) {
         articlePanels.push(createPanel(articles[i]));
     }
     //show articles in panels container

     articleContainer.append(articlePanels);
 }

 function createPanel(article) {
     //JSON object for article and jquery element with formatted HTML


     var panel = 
     $(["<div class='panel panel-default'>", 
    "<div class='panel-heading'>",
"<h3>",
article.headline,
"<a class='btn btn-success save'>"
,"Save Article",
"</a>",
"<h3>", 
"</div",
"<div class='panel-body'>",
article.summary,
"</div>",
"</div>"
 ].join(""));
 //putting an id to articles 

 panel.data("_id", article._id);

 return panel;
 }

 function renderEmpty() {


    var emptyAlert = 
    $(["<div class='alert alert-warning text-center'>",
    "<h4>Sorry, no new articles!'>",
    "</div>",
    "<div class-'panel panel-default'>",
    "div class-'panel-heading text-center'>",
    "<h3>What would you like?</h3>",
    "</div>",
    "<div class='panel-body text-center'>",
    "<h4><a class='scrape-new'> Try Scraping An Article</a></h4>",
    "<h4><a href='/saved'>Go To Saved Articles</a><h4>",
    "</div>",
    "</div>"
 ].join(""));

 articleContainer.append(emptyAlert);
 }
 
 function handleArticleSave() {



var articleToSave = $(this).parents(".panel").data();
articleToSave.saved = true;

$.ajax({
    method:"PATCH",
    url:"/api/headlines",
    data: articleToSAVE
})
    .then(function(data){


        if (data.ok) {

            initPage();
        }
    });
}

function handleArticleScrape() {

    $.get("/api/fetch")
    .then(function(data) {
           


        initPage();
        bootbox.alert("<h3 class='text-center m-top-80'>");
    });
}
});














function handleArticleSave() {
    //used when a user wants to save an article
    //returns rendered articles

    var articleToSave = $(this).parents(".panel").data();
    articleToSave.saved = true;

    $.ajax({
        method: "PATCH",
        url: "/api/headlines",
        data: articleToSave
    })
    .then(function(data) {
        //Mongoose will send object if successful

        if (data.ok) {
            initPage() ;

            }
    });
}

function handleArticleScrape () {

    $.get("/api/fetch")
    .then(function(data) {


        initPage();
    })
}