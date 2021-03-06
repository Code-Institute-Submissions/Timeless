// Function for Upvoting a Post
function upvote(a){
    let votes = parseInt($(a).parent().children('div').text())
    let post_id =$(a).data('postid')
    votes += 1;
    $(a).parent().children('div').text(votes);
    $.ajax({
        url:'/upvote',
        type:'POST',
        contentType: 'application/json;charset=UTF-8',
        dataType:"json",
        data: JSON.stringify({'PostID':post_id,
                              'Votes': votes})
    });
}
// Function for Downvoting a Post
function downvote(a){
    let votes = parseInt($(a).parent().parent('div').text())
    votes -=1;
    if(votes <0){
        votes = 0;
        $(a).parent().parent('div').text(votes);
    }else{
        $(a).parent().parent('div').text(votes);
    }
    $.ajax({
        url:'/downvote',
        type:'POST',
        contentType: 'application/json;charset=UTF-8',
        dataType:"json",
        data:JSON.stringify({'Votes':votes,
                             'PostID':$(a).data('postid')})
    })
    return false;
}
// Function for liking of Listing
function like(a){
    let likes = parseInt($(a).parent().children('div').text())
    let like_id =$(a).data('listingid')
    likes += 1;
    $(a).parent().children('div').text(likes);
    $.ajax({
        url:'/like',
        type:'POST',
        contentType: 'application/json;charset=UTF-8',
        dataType:"json",
        data: JSON.stringify({'ListingID':like_id,
                              'Likes': likes})
    });
}

// Single Page Application Functionality for Login Page and Welcome Page
function hideAllPages() {
    let pages = $(".page");
    for (let p of pages) {
        $(p).removeClass('show');
        $(p).addClass('hidden')
    }
}

$('#page2-btn').click(function(){
    let pageNumber = $(this).data('page');
    hideAllPages();
    $(`#page-${pageNumber}`).addClass('show');
    $(`#page-${pageNumber}`).removeClass('hidden');
})


// Main Forum Filters
$('#filter-text-recent').click(function(event){
    event.preventDefault();
    window.location='/home?sort_on=Date_Posted'
})

$('#filter-text-popular').click(function(event){
    event.preventDefault();
    window.location='/home?sort_on=Votes'
})
// MarketPlace Filters
$('#filter-text-recent-listings').click(function(event){
    event.preventDefault();
    window.location='/marketplace?sort_on=Date_Posted'
})

$('#filter-text-likes').click(function(event){
    event.preventDefault();
    window.location='/marketplace?sort_on=Likes'
})






$(function(){

    // Summernote Functionality
    $('#summernote').summernote({
        placeholder: 'Write Something!',
        tabsize: 2,
        height: 300,
        stripTags: ['style'],
        fontSizes: ['8', '10', '12', '14', '16', '18', '20', '22', '24' , '36', '48', '64'],
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['style', 'bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert', ['table']],
            ['view', ['fullscreen']]
        ]
    });

    // Used to Toggle the user sidebar
    $('#sidebarCollapse').on('click',function(){
        $('#sidebar,#content').toggleClass('active')
    })


// Function used to toggle the different forms to display for Global Search
     
    $('#listing-radio').on("change",function(){
        $('#listing-search').show();
        $('#post-search').hide();
        $('#submit-btn').show();
    })

    $('#post-radio').on("change",function(){
        $('#listing-search').hide();
        $('#post-search').show();
        $('#submit-btn').show();
    })

})