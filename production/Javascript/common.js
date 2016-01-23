
// common.js
// -------

var debug_trigger = true;

var display_segs = new Array(8);
//preload display images
display_segs[0] =new Image();
display_segs[1] =new Image();
display_segs[2] =new Image();
display_segs[3] =new Image();
display_segs[4] =new Image();
display_segs[5] =new Image();
display_segs[6] =new Image();
display_segs[7] =new Image();


// This defines the source of the display image
display_segs[0].src ="Images/blank.png";
display_segs[1].src ="Images/seg1.png";
display_segs[2].src ="Images/seg2.png";
display_segs[3].src ="Images/seg3.png";
display_segs[4].src ="Images/seg4.png";
display_segs[5].src ="Images/seg5.png";
display_segs[6].src ="Images/seg6.png";
display_segs[7].src ="Images/seg7.png";

TenToThe = [1E0, 1E1, 1E2, 1E3, 1E4, 1E5, 1E6, 1E7, 1E8, 1E9];

var seg_decoder = [
[1,1,1,0,1,1,1], // 0
[0,0,1,0,0,0,1], // 1
[0,1,1,1,1,1,0], // 2
[0,1,1,1,0,1,1], // 3
[1,0,1,1,0,0,1], // 4
[1,1,0,1,0,1,1], // 5
[1,1,0,1,1,1,1], // 6
[1,1,1,0,0,0,1], // 7
[1,1,1,1,1,1,1], // 8
[1,1,1,1,0,1,1], // 9
[0,0,0,0,0,0,0], // blank
[0,0,0,1,0,0,0], // minus
[1,1,0,1,1,1,0]  // error
];

next_pos = 0;

function ButtonToString( button ) // for debug purposes only
{
  switch( button )
  {
    case EButton.none:
      return 'none';
    case EButton.one:
      return 'one';
    case EButton.two:
      return 'two';
    case EButton.three:
      return 'three';
    case EButton.four:
      return 'four';
    case EButton.five:
      return 'five';
    case EButton.six:
      return 'six';
    case EButton.seven:
      return 'seven';
    case EButton.eight:
      return 'eight';
    case EButton.nine:
      return 'nine';
    case EButton.zero:
      return 'zero';
    case EButton.plus:
      return 'plus';
    case EButton.minus:
      return 'minus';
    case EButton.times:
      return 'times';
    case EButton.divide:
      return 'divide';
    case EButton.equals:
      return 'equals';
    default:
      return 'button(' + button + ')';
  }
}


function Precedence( op )
{
    switch( op )
    {
      case EOp.display:
      case EOp.add:
      case EOp.subtract:
        return 1;
      case EOp.multiply:
      case EOp.divide:
        return 2;
      default:
        return 0;
    }
}

function OpToString( op ) // for debugging only
{
  switch( op )
  {
      case EOp.display:
        return 'display';
      case EOp.add:
        return 'add';
      case EOp.subtract:
        return 'subtract';
      case EOp.multiply:
        return 'multiply';
      case EOp.divide:
        return 'divide';
      default:
        return 'unknown op('+op+')';
  }
}

function Report( msg )
{
    var t = document.forms[0].elements[0];
    t.value = t.value + msg + '\n';
}

function ClearReport( msg )
{
    var t = document.forms[0].elements[0];
    t.value = '';
}
