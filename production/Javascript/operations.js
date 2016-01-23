// operations.js

// Handles arithmetic operations, and equals key.
function Arithmetic( next_op )
{
  Report( 'Arithmetic ' + OpToString( next_op ) );
  var current_op = state.current_op;
  if( state.k && next_op == EOp.display )
  {
    current_op = kop;
    x.CopyFrom( k );
    x.Evaluate( accumulator, current_op );
    x.Swap( accumulator );
  }
  else if( state.current_op != EOp.display )
  {
    if( Precedence( current_op ) == Precedence( next_op ) )
    {
      accumulator.Evaluate( x, current_op );
      Report( 'Arithmetic same precedence as '+OpToString(current_op)+', a <- ' + OpToString( current_op ) + '(x)' );
    }
    else if( Precedence( current_op ) < Precedence( next_op ) )
    {
      y.CopyFrom( x );
      state.previous_op = current_op;
      Report( 'Arithmetic lower precedence than '+OpToString(current_op)+', y<-x' );
    }
    else //if( Precedence( state.current_op ) > Precedence( next_op ) )
    {
      accumulator.Evaluate( x, current_op );
      accumulator.Evaluate( y, state.previous_op );
      Report( 'Arithmetic higher precedence than '+OpToString(current_op)+', a<-' + OpToString( current_op ) + '(x)' );
      Report( 'Arithmetic higher precedence than '+OpToString(state.current_op)+', a<-' + OpToString( state.previous_op ) + '(y)' );
    }
  }

  state.current_op = next_op;

  state.update_time = 100;

  Report( 'Arithmetic current_op set to ' + OpToString( state.current_op ) );

  accumulator.Level(); // this re-displays the accumulator, evaluating exponents, using the current display mode, in the current base, removes trailing zeroes.
}


// Adds the designated glyph to the rightmost character in the accumulator (and
// hence the display after the next update), shifting existing characters left.
function OpGlyph( glyph )
{
    // Time to blank display after this operation
    state.update_time = 20;

    // Check display isn't full
    if( accumulator.glyph_count<10 )
    {
        // Shift the existing characters left one place
        if( accumulator.glyph_count != 0 )
        {
            for( var i=9; i>0; --i )
            {
                accumulator.display[i] = accumulator.display[i-1];
            }
            if( accumulator.point_pos >= 0 )
            {
                accumulator.point_pos++;
            }
            if( accumulator.minus_pos >= 0 )
            {
                accumulator.minus_pos++;
            }
        }
        // Increment glyph count, unless user is entering leading zeroes
        if( accumulator.glyph_count != 0 || glyph != EGlyph.zero )
        {
            accumulator.glyph_count++;
        }

        // Add this latest glyph
        accumulator.display[0] = glyph;
   // alert('setting accumulator.glyph_count to ' + accumulator.glyph_count  );

    }
}

function OpExpGlyph( glyph )
{
    accumulator.exp[1] = accumulator.exp[0];
    accumulator.exp[0] = glyph;
}

function OpPoint()
{
    state.update_time = 20;

   // alert('setting accumulator.point_pos to ' + 0 + ' was ' + accumulator.point_pos );
    if( accumulator.point_pos == -1 )
    {
        // If user hasn't entered any digits, enter a zero first
        if( accumulator.glyph_count == 0 )
        {
            accumulator.display[0] = EGlyph.zero;
            accumulator.glyph_count = 1;
        }
        accumulator.point_pos = 0;
    }
}

function OpPlusMinus()
{
    // alert('accumulator.minus_pos ' + accumulator.minus_pos + '  accumulator.glyph_count ' + accumulator.glyph_count );
    if( accumulator.glyph_count > 0 )
    {
        if( accumulator.minus_pos == -1 )
        {
            accumulator.minus_pos =  accumulator.glyph_count;
        }
        else
        {
            //alert('accumulator.minus_pos cleared');
            accumulator.minus_pos = -1;
        }
    }
}

function OpExpPlusMinus()
{
    accumulator.minus_exp = !accumulator.minus_exp;
}

function OpConstant( c )
{
    state.update_time = 100;

    switch( c )
    {
        case EConstant.c: // 299792458
            accumulator.Set(9,[ 8,5,4,2,9,7,9,9,2,EGlyph.blank ],[EGlyph.blank,EGlyph.blank],-1,-1,false);
            break;
        case EConstant.h: // 6.626176, -34
            accumulator.Set(7,[6,7,1,6,2,6,6,EGlyph.blank,EGlyph.blank,EGlyph.blank],[4,3],6,-1,true);
            break;
        case EConstant.G: // 6.672, -11
            accumulator.Set(4,[2,7,6,6,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank],[1,1],3,-1,true);
            break;
        case EConstant.g: // 9.80665, 0
            accumulator.Set(6,[5,6,6,0,8,9,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank],[EGlyph.blank,EGlyph.blank],5,-1,false);
            break;
        case EConstant.R: // 8.31441, 0
            accumulator.Set(6,[1,4,4,1,3,8,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank],[EGlyph.blank,EGlyph.blank],5,-1,false);
            break;
        case EConstant.e: //1.6021892, -19
            accumulator.Set(8,[2,9,8,1,2,0,6,1,EGlyph.blank,EGlyph.blank],[9,1],7,-1,true);
            break;
        case EConstant.me: //9.109534, -31
            accumulator.Set(7,[4,3,5,9,0,1,9,EGlyph.blank,EGlyph.blank,EGlyph.blank],[1,3],6,-1,true);
            break;
        case EConstant.u: //1.6605655, -27
            accumulator.Set(8,[5,5,6,5,0,6,6,1,EGlyph.blank,EGlyph.blank],[7,2],7,-1,true);
            break;
        case EConstant.epsilon0: //8.854187818, -12
            accumulator.Set(10,[8,1,8,7,8,1,4,5,8,8],[2,1],9,-1,true);
            break;
        case EConstant.mu0: //1.256637061, -6
            accumulator.Set(10,[1,6,0,7,3,6,6,5,2,1],[6,0],9,-1,true);
            break;
        case EConstant.NA: //6.022045, 23
            accumulator.Set(7,[5,4,0,2,2,0,6,EGlyph.blank,EGlyph.blank,EGlyph.blank],[3,2],6,-1,false);
            break;
        case EConstant.k: //1.380662, -23
            accumulator.Set(7,[2,6,6,0,8,3,1,EGlyph.blank,EGlyph.blank,EGlyph.blank],[3,2],6,-1,true);
            break;
        case EConstant.Vm: //0.02241383, 0
            accumulator.Set(9,[3,8,3,1,4,2,2,0,0,EGlyph.blank],[EGlyph.blank,EGlyph.blank],8,-1,false);
            break;
        case EConstant.pi: //3.141592654, 0
            accumulator.Set(10,[4,5,6,2,9,5,1,4,1,3],[EGlyph.blank,EGlyph.blank],9,-1,false);
            break;
    }
}

function OpRandom()
{
    accumulator.Set( 4,[Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10),0,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank],
                [EGlyph.blank,EGlyph.blank],    3,    -1,    false );
}
