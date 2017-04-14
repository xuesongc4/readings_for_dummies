
var speed = 300;
var counter = 3;
var started_flag = false;
var print_counter = 0;
var interval = null;

$(document).ready(function(){
    change_speed();
});


function get_spaces(){
    get_spaces.text_to_parse = ' '+$('.text_to_read').val()+' ';
    get_spaces.spaces_array = [];

    for(var i= 0; i<get_spaces.text_to_parse.length; i++) {
        if (get_spaces.text_to_parse[i] == " ") {
            while (get_spaces.text_to_parse[i] == " ") {
                i++;
            }
            get_spaces.spaces_array.push(i);
        }
    }
}

function get_words(){
    var first_space = null;
    var second_space = null;
    get_words.word_array = [];

    for(var i = 1; i<get_spaces.spaces_array.length; i++){
        first_space = get_spaces.spaces_array[i-1];
        second_space = get_spaces.spaces_array[i];
        var text = get_spaces.text_to_parse.slice(first_space,second_space);
        var text_final = text.replace(" ","");

        get_words.word_array.push(text_final);
    }
}

function print_words(position){
    var reading_area = $("#reading_area");

    clearInterval(interval);
    interval = setInterval(function(){
        reading_area.text(get_words.word_array[print_counter]);
        print_counter++;
        if (print_counter == get_words.word_array.length){
            clearInterval(interval);
            print_counter=0;
            started_flag=false;
        }
    }, speed);
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
                print_words(print_counter);
                console.log("your word position is: "+print_counter)
            }
        }
        if(e.which==40) {
            if(counter == 1){
                return
            }
            counter--;
            speed_display(counter*100);
            if(started_flag == true){
                print_words(print_counter);
                console.log("your word position is: "+print_counter)
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