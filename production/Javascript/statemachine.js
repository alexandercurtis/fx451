// statemachine.js

function StateMachine()
{
    this.angle=EAngle.deg;
    this.base=10;
    this.mode=EMode.numberentry;
    this.target=ETarget.none;
    this.sd=false;
    this.k=false;
    this.update_time=0;
    this.update_id=0;
    this.current_op = EOp.display;
    this.previous_op = EOp.display;
    this.last_button = EButton.none;
}

StateMachine.prototype.Report = function()
{
    var status_string = 'state=';
    switch( this.angle )
    {
        case EAngle.deg:
            status_string += 'deg';
            break;
        case EAngle.rad:
            status_string += 'rad';
            break;
        case EAngle.gra:
            status_string += 'gra';
            break;
        default:
            status_string += '   ';
            break;
    }
    status_string += ' ';
    if( this.base < 10 )
    {
        status_string += '0';
    }
    status_string += this.base;
    status_string += ' ';
    switch( this.mode )
    {
        case EMode.numberentry:
            status_string += 'num  ';
            break;
        case EMode.shiftpressed:
            status_string += 'shift';
            break;
        case EMode.modepressed:
            status_string += 'mode ';
            break;
        default:
            status_string += this.mode;
            break;
    }
    status_string += ' ';
    switch( this.target )
    {
        case ETarget.none:
            status_string += 'none';
            break;
        case ETarget.display:
            status_string += 'disp';
            break;
        case ETarget.exp:
            status_string += 'exp ';
            break;
        default:
            status_string += this.target;
            break;
    }
    status_string += ' ';
    if( this.sd )
    {
        status_string += 'sd';
    }
    else
    {
        status_string += '  ';
    }
    status_string += ' ';
    status_string += this.update_time;
    status_string += ',';
    status_string += this.update_id;

    status_string += 'button=' + ButtonToString( this.last_button );
    Report( status_string );
}

