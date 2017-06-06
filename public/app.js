$('document').ready(function() {
    $('#sc').click(function() {
        //alert("Button Clicked");
        $.ajax({
            url: "/scrape",
            success: function(data) {
                $.getJSON("/articles", function(data) {
                    // For each one
                    for (var i = 0; i < data.length; i++) {
                        var id = i;
                        // Display the apropos information on the page
                        if (data[i]==="" || data[i]===null)
                        {}
                        else
                        {
                        $("#articles").append("<div class = 'col-lg-6' style='float:left; border-style:solid; border-color:black; border-width:2px; border-radius:10px; background-color:orange;'>(" + id + ") " + data[i] + " <button class = 'btn-circle' id=tag<%=a"+id+"%><i class='glyphicon glyphicon-list'></i></button><button class='btn-circle' id=b"+id+"><i class='glyphicon glyphicon-ok'></i></button><button class = 'btn-circle' id=c"+id+"><i class='glyphicon glyphicon-remove'></i></button></div>");
                        }
                   //  $('.model-title').html('<h1>'+i+'</h1>');
                 //    $("#myModal").modal({backdrop: false});
                    }

                })
            }
        })
    });
});

$('#articles').ready(function() {

$('.btn-circle').on('click', function() {  
    alert($(this).attr('id'));
    });
});


// When you click the savenote button
$(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#bodyinput").val()
            }
        })
        // With that done
        .done(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});