//Get Containing div for game board and pieces
let container = document.querySelector('#container');

//Initialize Game
document.addEventListener('DOMContentLoaded', () => {

    ResetBoard();

    document.querySelector('#reset-btn').addEventListener("click", function() {
        ResetBoard();
    });

    document.querySelector('#rules-btn').addEventListener('click', function() {

        if (document.querySelector('#rules-btn').innerHTML == '▲') {
            document.querySelector('#rules-btn').innerHTML = '▼';

            document.querySelector('#rules').style.height = 0;
            document.querySelector('#rules').style.padding = '1px';
            document.querySelector('#rules').style.marginBottom = '10px';

            document.querySelector('#rules-text').style.display = 'none';
        } else {
            document.querySelector('#rules-btn').innerHTML = '▲';

            document.querySelector('#rules').style.height = '100%';
            document.querySelector('#rules').style.padding = '15px';
            document.querySelector('#rules').style.marginBottom = 0;

            document.querySelector('#rules-text').style.display = 'block';
        }

    });
});

//Create rows and cirlce pieces
function CreateRow(Row) {
    //Initialize Row Div
    let Row_Div = document.createElement('div');

    //Style Row Divs
    Row_Div.classList.add('Row-' + Row);
    Row_Div.classList.add('Row');

    //Add correct amount of circles for each row
    for (let i = 0; i <= Row; i++) {

        //Create Circle element
        let NewCircle = document.createElement('div');
        //Style circle element
        NewCircle.classList.add('circle');
        NewCircle.classList.add('filled');
        NewCircle.id = ('circle-' + Row + '-' + i);

        if (Row === 0) {
            NewCircle.classList.remove('filled');
            NewCircle.classList.add('empty');
        }
        //Append circle element
        Row_Div.appendChild(NewCircle);

    }

    //Set Distances between rows
    let Vert_Distance = (Row * 50) + 50;
    Row_Div.style.top = Vert_Distance + 'px';

    //Append Row Div to container
    container.appendChild(Row_Div);
}


//Circle Clicked Function
//Initialize circle location... used later for valid move verifications
let circle_location_1 = '';
let circle_location_2 = '';
let circle_location_3 = '';

function CircleClick(circle) {
    //Setting first position to first circle click and second position to second circle click
    if (circle_location_1 === '') {
        
        circle_location_1 = circle.target.id;

        if (document.querySelector('#' + circle_location_1).classList[1] != 'filled') {
            //Reset locations
            circle_location_1 = '';
        } else {
            circle.target.classList.add("selected");
        }
    } else {
        circle_location_2 = circle.target.id;
        ValidMoveCheck(circle_location_1, circle_location_2);
        document.querySelector('#' + circle_location_1).classList.remove('selected');
        document.querySelector('#' + circle_location_2).classList.remove('selected');

        //Reset locations
        circle_location_1 = '';
        circle_location_2 = '';
    }

}

//Check and see if location 1 can move to location 2
function ValidMoveCheck(circle_location_1, circle_location_2) {

    let can_move = false;
    let location_2_check = document.getElementById(circle_location_2).classList[1];

    switch (circle_location_1) {
        case 'circle-0-0':
            if (location_2_check != 'filled') {
                if (circle_location_2 === 'circle-2-0') {
                    can_move = RemoveJumpedCircle('circle-1-0');
                } else if (circle_location_2 === 'circle-2-2') {
                    can_move = RemoveJumpedCircle('circle-1-1');
                }
            }
            break;
        case 'circle-1-0':
            if (location_2_check != 'filled') {
                if (circle_location_2 === 'circle-3-0') {
                    can_move = RemoveJumpedCircle('circle-2-0');
                } else if (circle_location_2 === 'circle-3-2') {
                    can_move = RemoveJumpedCircle('circle-2-1');
                }
            }
            break;
        case 'circle-1-1':
            if (location_2_check != 'filled') {
                if (circle_location_2 === 'circle-3-1') {
                    can_move = RemoveJumpedCircle('circle-2-1');
                } else if (circle_location_2 === 'circle-3-3') {
                    can_move = RemoveJumpedCircle('circle-2-2');
                }
            }
            break;
        case 'circle-2-0':
            if (location_2_check != 'filled') {
                if (circle_location_2 === 'circle-0-0') {
                    can_move = RemoveJumpedCircle('circle-1-0');
                } else if (circle_location_2 === 'circle-2-2') {
                    can_move = RemoveJumpedCircle('circle-2-1');
                } else if (circle_location_2 === 'circle-4-0') {
                    can_move = RemoveJumpedCircle('circle-3-0');
                } else if (circle_location_2 === 'circle-4-2') {
                    can_move = RemoveJumpedCircle('circle-3-1');
                }
            }
            break;
        case 'circle-2-1':
            if (location_2_check != 'filled') {
                if (circle_location_2 === 'circle-4-1') {
                    can_move = RemoveJumpedCircle('circle-3-1');
                } else if (circle_location_2 === 'circle-4-3') {
                    can_move = RemoveJumpedCircle('circle-3-2');
                }
            }
            break;
        case 'circle-2-2':
            if (location_2_check != 'filled') {
                if (circle_location_2 === 'circle-0-0') {
                    can_move = RemoveJumpedCircle('circle-1-1');
                } else if (circle_location_2 === 'circle-2-0') {
                    can_move = RemoveJumpedCircle('circle-2-1');
                } else if (circle_location_2 === 'circle-4-2') {
                    can_move = RemoveJumpedCircle('circle-3-2');
                } else if (circle_location_2 === 'circle-4-4') {
                    can_move = RemoveJumpedCircle('circle-3-3');
                }
            }
            break;
        case 'circle-3-0':
            if (location_2_check != 'filled') {
                if (circle_location_2 === 'circle-1-0') {
                    can_move = RemoveJumpedCircle('circle-2-0');
                } else if (circle_location_2 === 'circle-3-2') {
                    can_move = RemoveJumpedCircle('circle-3-1');
                }
            }
            break;
        case 'circle-3-1':
            if (location_2_check != 'filled') {
                if (circle_location_2 === 'circle-1-1') {
                    can_move = RemoveJumpedCircle('circle-2-1');
                } else if (circle_location_2 === 'circle-3-3') {
                    can_move = RemoveJumpedCircle('circle-3-2');
                }
            }
            break;
        case 'circle-3-2':
            if (location_2_check != 'filled') {
                if (circle_location_2 === 'circle-1-0') {
                    can_move = RemoveJumpedCircle('circle-2-1');
                } else if (circle_location_2 === 'circle-3-0') {
                    can_move = RemoveJumpedCircle('circle-3-1');
                }
            }
            break;
        case 'circle-3-3':
            if (location_2_check != 'filled') {
                if (circle_location_2 === 'circle-1-1') {
                    can_move = RemoveJumpedCircle('circle-2-2');
                } else if (circle_location_2 === 'circle-3-1') {
                    can_move = RemoveJumpedCircle('circle-3-2');
                }
            }
            break;
        case 'circle-4-0':
            if (location_2_check != 'filled') {
                if (circle_location_2 === 'circle-2-0') {
                    can_move = RemoveJumpedCircle('circle-3-0');
                } else if (circle_location_2 === 'circle-4-2') {
                    can_move = RemoveJumpedCircle('circle-4-1');
                }
            }
            break;
        case 'circle-4-1':
            if (location_2_check != 'filled') {
                if (circle_location_2 === 'circle-2-1') {
                    can_move = RemoveJumpedCircle('circle-3-1');
                } else if (circle_location_2 === 'circle-4-3') {
                    can_move = RemoveJumpedCircle('circle-4-2');
                }
            }
            break;
        case 'circle-4-2':
            if (location_2_check != 'filled') {
                if (circle_location_2 === 'circle-2-0') {
                    can_move = RemoveJumpedCircle('circle-3-1');
                } else if (circle_location_2 === 'circle-2-2') {
                    can_move = RemoveJumpedCircle('circle-3-2');
                } else if (circle_location_2 === 'circle-4-0') {
                    can_move = RemoveJumpedCircle('circle-4-1');
                } else if (circle_location_2 === 'circle-4-4') {
                    can_move = RemoveJumpedCircle('circle-4-3');
                }
            }
            break;
        case 'circle-4-3':
            if (location_2_check != 'filled') {
                if (circle_location_2 === 'circle-2-1') {
                    can_move = RemoveJumpedCircle('circle-3-2');
                } else if (circle_location_2 === 'circle-4-1') {
                    can_move = RemoveJumpedCircle('circle-4-2');
                }
            }
            break;
        case 'circle-4-4':
            if (location_2_check != 'filled') {
                if (circle_location_2 === 'circle-2-2') {
                    can_move = RemoveJumpedCircle('circle-3-3');
                } else if (circle_location_2 === 'circle-4-2') {
                    can_move = RemoveJumpedCircle('circle-4-3');
                }
            }
            break;
        default:
            break;
    }

    //Is valid move -----------------------------------------------------------------
    if (can_move) {
        //Empty first location
        document.querySelector('#' + circle_location_1).classList.remove('filled');
        document.querySelector('#' + circle_location_1).classList.remove('selected');
        document.querySelector('#' + circle_location_1).classList.add('empty');
        
        //Fill second location
        document.querySelector('#' + circle_location_2).classList.remove('empty');
        document.querySelector('#' + circle_location_2).classList.add('filled');
    }
}

function RemoveJumpedCircle(circle_location_3) {
    
    if (document.querySelector('#' + circle_location_3).classList[1] === 'filled') {
        //Empty middle location
        document.querySelector('#' + circle_location_3).classList.remove('filled');
        document.querySelector('#' + circle_location_3).classList.add('empty');
        
        return true;
    } else {
        return false;
    }
}

function ResetBoard() {
    document.querySelector('#container').innerHTML = '';

    let Rows = [];

    for (let i = 0; i < 5; i++) {
        Rows[i] = i;
    }

    //Form the rows and place circles within them
    Rows.forEach(Row => {
        CreateRow(Row);
    });

    //Register a click on a circle
    let circle_class = Array.from(document.getElementsByClassName('circle'));
    circle_class.forEach(function (circle) {
        circle.addEventListener("click", function (e) {
            CircleClick(e);
        });
    });
}