
var speed = 300;
var counter = 3;
var started_flag = false;
var current_word = null;


$(document).ready(function(){
    change_speed();
});


function get_spaces(){
    get_spaces.sandwhich_spaces=' '+$('.text_to_read').val()+' ';
    get_spaces.text_to_parse = get_spaces.sandwhich_spaces;
    var previous = null;
    var current = null;
    get_spaces.spaces_array = [];
    get_spaces.spaces_array_final = [];

    for(var i= 0; i<get_spaces.text_to_parse.length; i++){
        if(get_spaces.text_to_parse[i]==" "){
            get_spaces.spaces_array.push(i);
        }
    }
    for(var j= 1; j<get_spaces.spaces_array.length; j++){
        previous = get_spaces.spaces_array[j-1];
        current = get_spaces.spaces_array[j];

        if(current-1 != previous){
            get_spaces.spaces_array_final.push(current);
        }
    }
    console.log( get_spaces.spaces_array_final);
}
function get_words(){
    var first_space = null;
    var second_space = null;
    get_words.word_array = [];

    for(var i = 1; i<get_spaces.spaces_array_final.length; i++){
        first_space = get_spaces.spaces_array_final[i-1];
        second_space = get_spaces.spaces_array_final[i];
        get_words.word_array.push(get_spaces.text_to_parse.slice(first_space,second_space));
    }
    console.log( get_words.word_array);
}
function print_words(position){
    var reading_area = $("#reading_area");

    function doScaledTimeout(i) {
        setTimeout(function () {
            current_word = i;
            // console.log(current_word);
            $("#reading_area").text(get_words.word_array[i])
        }, i * speed);
    }

    if(position){
        for(var i = position; i<get_words.word_array.length; i++){
            doScaledTimeout(i);
        }
    }
    else{
        for(var i = 0; i<get_words.word_array.length; i++){
            doScaledTimeout(i);
        }
    }
    started_flag=false;
}

function doit(){
    get_spaces();
    get_words();
    print_words();
    started_flag=true;
}

function speed_display(speed_input){
    var temp_speed=1000/(speed_input/60);
    speed = parseInt(temp_speed);
    $(".wpm").text(speed_input);
}

function change_speed(){
    $(document).bind('keyup', function(e){

        if(e.which==38) {
            if(counter == 8){
                return
            }
            counter++;
            speed_display(counter*100);

            if(started_flag == true){
                print_words(current_word);
            }
        }
        if(e.which==40) {
            if(counter == 1){
                return
            }
            counter--;
            speed_display(counter*100);
            if(started_flag == true){
                print_words(current_word);
            }
        }
    });
}

function flip_page(){
    $("#intro_page").addClass("flip_page");
    $(".click_to_start").removeClass("click_hover")
    setTimeout(function(){
        $("#intro_page").fadeOut();
    },1500)
}