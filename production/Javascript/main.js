<!--
// main.js
// -------
// Key information:
// ButtonPressed() is the prime moving event driver
// OpEquals() does the calculation
// SetValue() converts a javascript number to the display
// Register is the class to represent a number in the calculator's memory.
// Register.display represents the digits (glyphs, since they include special characters)
// Register.toString() converts a register in the calcs memory to a javascript string suitable for js's eval() function.

// There are several modes (number entry,shift pressed,mode pressed, error), and the mode affects what a button does.
// Adding a new feature depends on what it does:
//  If it just changes state, and mode, make the changes in main.js:ButtonPressed.
//  If it performs a non-arithmetic operation, add an OpXXXX function.
//  If it performs an arithmetic operation, i.e. involving other registers, use the Arithmetic function.

var accumulator = new Register('a');
var x = new Register('x');
var y = new Register('y');
var memory = new Register('m');
var state = new StateMachine();
var k = new Register('k');
var kop = EOp.display;

function ButtonPressed(button_id)
{
    ClearReport();

    state.update_time = 0;

    //alert( 'button ' + button_id );
    switch( button_id )
    {
        case EButton.one:
            switch( state.mode )
            {
                case EMode.numberentry:
                    if( state.target == ETarget.none )
                    {
                        //if( state.current_op != EOp.None )
                        {
                            x.CopyFrom( accumulator );
                        }
                        accumulator.Clear();
                        state.target = ETarget.display;
                    }
                    if( state.target == ETarget.exp )
                    {
                        OpExpGlyph( 1 );
                    }
                    else
                    {
                        OpGlyph( 1 );
                    }
                    break;
                case EMode.shiftpressed:
                    //if( state.current_op != EOp.None )
                    {
                        x.CopyFrom( accumulator );
                    }
                    OpConstant( EConstant.c );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
                case EMode.modepressed:
                    state.base = 2;
                    state.sd = false;
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
            }
            break;
        case EButton.two:
            switch( state.mode )
            {
                case EMode.numberentry:
                    if( state.target == ETarget.none )
                    {
                        //if( state.current_op != EOp.None )
                        {
                            x.CopyFrom( accumulator );
                        }
                        accumulator.Clear();
                        state.target = ETarget.display;
                    }
                    if( state.target == ETarget.exp )
                    {
                        OpExpGlyph( 2 );
                    }
                    else
                    {
                        OpGlyph( 2 );
                    }
                    break;
                case EMode.shiftpressed:
                    //if( state.current_op != EOp.None )
                    {
                        x.CopyFrom( accumulator );
                    }
                    OpConstant( EConstant.h );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
                case EMode.modepressed:
                    state.base = 8;
                    state.sd = false;
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
            }
            break;
        case EButton.three:
            switch( state.mode )
            {
                case EMode.numberentry:
                    if( state.target == ETarget.none )
                    {
                        //if( state.current_op != EOp.None )
                        {
                            x.CopyFrom( accumulator );
                        }
                        accumulator.Clear();
                        state.target = ETarget.display;
                    }
                    if( state.target == ETarget.exp )
                    {
                        OpExpGlyph( 3 );
                    }
                    else
                    {
                        OpGlyph( 3 );
                    }
                    break;
                case EMode.shiftpressed:
                    //if( state.current_op != EOp.None )
                    {
                        x.CopyFrom( accumulator );
                    }
                    OpConstant( EConstant.G );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
                case EMode.modepressed:
                    state.base = 16;
                    state.sd = false;
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
            }
            break;
        case EButton.four:
            switch( state.mode )
            {
                case EMode.numberentry:
                    if( state.target == ETarget.none )
                    {
                        //if( state.current_op != EOp.None )
                        {
                            x.CopyFrom( accumulator );
                        }
                        accumulator.Clear();
                        state.target = ETarget.display;
                    }
                    if( state.target == ETarget.exp )
                    {
                        OpExpGlyph( 4 );
                    }
                    else
                    {
                        OpGlyph( 4 );
                    }
                    break;
                case EMode.shiftpressed:
                    //if( state.current_op != EOp.None )
                    {
                        x.CopyFrom( accumulator );
                    }
                    OpConstant( EConstant.e );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
                case EMode.modepressed:
                    state.angle = EAngle.deg;
                    state.mode = EMode.numberentry;
                    break;
            }
            break;
        case EButton.five:
            switch( state.mode )
            {
                case EMode.numberentry:
                    if( state.target == ETarget.none )
                    {
                        //if( state.current_op != EOp.None )
                        {
                            x.CopyFrom( accumulator );
                        }
                        accumulator.Clear();
                        state.target = ETarget.display;
                    }
                    if( state.target == ETarget.exp )
                    {
                        OpExpGlyph( 5 );
                    }
                    else
                    {
                        OpGlyph( 5 );
                    }
                    break;
                case EMode.shiftpressed:
                    //if( state.current_op != EOp.None )
                    {
                        x.CopyFrom( accumulator );
                    }
                    OpConstant( EConstant.me );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
                case EMode.modepressed:
                    state.angle = EAngle.rad;
                    state.mode = EMode.numberentry;
                    break;
            }
            break;
        case EButton.six:
            switch( state.mode )
            {
                case EMode.numberentry:
                    if( state.target == ETarget.none )
                    {
                        //if( state.current_op != EOp.None )
                        {
                            x.CopyFrom( accumulator );
                        }
                        accumulator.Clear();
                        state.target = ETarget.display;
                    }
                    if( state.target == ETarget.exp )
                    {
                        OpExpGlyph( 6 );
                    }
                    else
                    {
                        OpGlyph( 6 );
                    }
                    break;
                case EMode.shiftpressed:
                    //if( state.current_op != EOp.None )
                    {
                        x.CopyFrom( accumulator );
                    }
                    OpConstant( EConstant.u );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
                case EMode.modepressed:
                    state.angle = EAngle.gra;
                    state.mode = EMode.numberentry;
                    break;
            }
            break;
        case EButton.seven:
            switch( state.mode )
            {
                case EMode.numberentry:
                    if( state.target == ETarget.none )
                    {
                        //if( state.current_op != EOp.None )
                        {
                            x.CopyFrom( accumulator );
                        }
                        accumulator.Clear();
                        state.target = ETarget.display;
                    }
                    if( state.target == ETarget.exp )
                    {
                        OpExpGlyph( 7 );
                    }
                    else
                    {
                        OpGlyph( 7 );
                    }
                    break;
                case EMode.shiftpressed:
                    //if( state.current_op != EOp.None )
                    {
                        x.CopyFrom( accumulator );
                    }
                    OpConstant( EConstant.NA );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
                case EMode.modepressed:
                    // TODO : FIX
                    alert( 'Feature not yet implemented.' );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
            }
            break;
        case EButton.eight:
            switch( state.mode )
            {
                case EMode.numberentry:
                    if( state.target == ETarget.none )
                    {
                        //if( state.current_op != EOp.None )
                        {
                            x.CopyFrom( accumulator );
                        }
                        accumulator.Clear();
                        state.target = ETarget.display;
                    }
                    if( state.target == ETarget.exp )
                    {
                        OpExpGlyph( 8 );
                    }
                    else
                    {
                        OpGlyph( 8 );
                    }
                    break;
                case EMode.shiftpressed:
                    //if( state.current_op != EOp.None )
                    {
                        x.CopyFrom( accumulator );
                    }
                    OpConstant( EConstant.k );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
                case EMode.modepressed:
                    // TODO : SCI
                    alert( 'Feature not yet implemented.' );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
            }
            break;
        case EButton.nine:
            switch( state.mode )
            {
                case EMode.numberentry:
                    if( state.target == ETarget.none )
                    {
                        //if( state.current_op != EOp.None )
                        {
                            x.CopyFrom( accumulator );
                        }
                        accumulator.Clear();
                        state.target = ETarget.display;
                    }
                    if( state.target == ETarget.exp )
                    {
                        OpExpGlyph( 9 );
                    }
                    else
                    {
                        OpGlyph( 9 );
                    }
                    break;
                case EMode.shiftpressed:
                    //if( state.current_op != EOp.None )
                    {
                        x.CopyFrom( accumulator );
                    }
                    OpConstant( EConstant.Vm );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
                case EMode.modepressed:
                    // TODO : NORM
                    alert( 'Feature not yet implemented.' );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
            }
            break;
        case EButton.zero:
            switch( state.mode )
            {
                case EMode.numberentry:
                    if( state.target == ETarget.none )
                    {
                        //if( state.current_op != EOp.None )
                        {
                            x.CopyFrom( accumulator );
                        }
                        accumulator.Clear();
                        state.target = ETarget.display;
                    }
                    if( state.target == ETarget.exp )
                    {
                        OpExpGlyph( 0 );
                    }
                    else
                    {
                        OpGlyph( 0 );
                    }
                    break;
                case EMode.shiftpressed:
                    //if( state.current_op != EOp.None )
                    {
                        x.CopyFrom( accumulator );
                    }
                    // TODO : RND
                    alert( 'Feature not yet implemented.' );
                    break;
                case EMode.modepressed:
                    state.base = 10;
                    state.sd = false;
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
            }
            break;
        case EButton.shift:
            switch( state.mode )
            {
                case EMode.numberentry:
                case EMode.modepressed:
                    state.mode = EMode.shiftpressed;
                    break;
                case EMode.shiftpressed:
                    state.mode = EMode.numberentry;
                    break;
            }
            break;
        case EButton.mode:
            switch( state.mode )
            {
                case EMode.numberentry:
                case EMode.shiftpressed:
                case EMode.modepressed:
                    state.mode = EMode.modepressed;
                    break;
            }
            break;
        case EButton.plusminus:
            switch( state.mode )
            {
                case EMode.shiftpressed:
                case EMode.modepressed:
                    state.mode = EMode.numberentry;
                case EMode.numberentry:
                    if( state.target == ETarget.exp )
                    {
                        OpExpPlusMinus();
                    }
                    else
                    {
                        OpPlusMinus();
                    }
                    break;
            }
            break;
        case EButton.point:
            switch( state.mode )
            {
                case EMode.numberentry:
                    if( state.target == ETarget.none )
                    {
                        //if( state.current_op != EOp.None )
                        {
                            x.CopyFrom( accumulator );
                        }
                        accumulator.Clear();
                        state.target = ETarget.display;
                    }
                    if( state.target != ETarget.exp )
                    {
                        OpPoint();
                        state.target = ETarget.display;
                    }
                    break;
                case EMode.shiftpressed:
                    //if( state.current_op != EOp.None )
                    {
                        x.CopyFrom( accumulator );
                    }
                    OpRandom();
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
                case EMode.modepressed:
                    state.sd = true;
                    accumulator.Clear();
                    OpGlyph(0);
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
            }
            break;
        case EButton.special:
            Report( "Hello world!\n" );
            break;
        case EButton.c:
            switch( state.mode )
            {
                case EMode.numberentry:
                case EMode.shiftpressed:
                case EMode.modepressed:
                    accumulator.Clear();
                    OpGlyph(0);
                    state.mode = EMode.numberentry;
                    state.target = ETarget.display;
                    break;
                    break;
            }
            break;
        case EButton.ac:
            switch( state.mode )
            {
                case EMode.error:
                case EMode.numberentry:
                case EMode.modepressed:
                    accumulator.Clear();
                    x.Clear();
                    OpGlyph(0);
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    state.k = false;                      
                    break;
                case EMode.shiftpressed:
                    // TODO : SAC
                    alert( 'Feature not yet implemented.' );
                    break;
            }
            break;
        case EButton.exp:
        //alert( 'exp mode is ' + state.mode + ' target is '+state.target );
            switch( state.mode )
            {
                case EMode.modepressed:
                case EMode.numberentry:
                    if( state.target == ETarget.none )
                    {
                        OpConstant( EConstant.pi );
                        state.mode = EMode.numberentry;
                    }
                    else if( state.target == ETarget.display )
                    {
                        accumulator.SetExp([0,0],false);
                        state.target = ETarget.exp;
                    }
                    break;
                case EMode.shiftpressed:
                    OpConstant( EConstant.pi );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
            }
            break;
        case EButton.plus:
            switch( state.mode )
            {
                case EMode.shiftpressed:
                    OpConstant( EConstant.g );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
                case EMode.modepressed:
                case EMode.numberentry:
                    if( state.last_button == EButton.plus && state.previous_op == EOp.display )
                    {
                      if( state.k )
                      {
                        state.k = false;
                      }
                      else
                      {
                        k.CopyFrom( accumulator );
                        kop = EOp.add;
                        state.k = true;
                      }
                    }
                    else
                    {
                      Arithmetic( EOp.add );
                    }
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none; // So that next number entered will put x<-a and clear display.
                    break;
            }
            break;
        case EButton.minus:
            switch( state.mode )
            {
                case EMode.shiftpressed:
                    OpConstant( EConstant.R );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
                case EMode.modepressed:
                case EMode.numberentry:
                    if( state.last_button == EButton.minus && state.previous_op == EOp.display  )
                    {
                      if( state.k )
                      {
                        state.k = false;
                      }
                      else
                      {
                        k.CopyFrom( accumulator );
                        kop = EOp.subtract;
                        state.k = true;
                      }
                    }
                    else
                    {
                      Arithmetic( EOp.subtract );
                    }
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none; // So that next number entered will put x<-a and clear display.
                    break;
            }
            break;
        case EButton.times:
            switch( state.mode )
            {
                case EMode.shiftpressed:
                    OpConstant( EConstant.epsilon0 );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
                case EMode.modepressed:
                case EMode.numberentry:
                    if( state.last_button == EButton.times && state.previous_op == EOp.display  )
                    {
                      if( state.k )
                      {
                        state.k = false;
                      }
                      else
                      {
                        k.CopyFrom( accumulator );
                        kop = EOp.multiply;
                        state.k = true;
                      }
                    }
                    else
                    {
                      Arithmetic( EOp.multiply );
                    }
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none; // So that next number entered will put x<-a and clear display.
                    break;
            }
            break;
        case EButton.divide:
            switch( state.mode )
            {
                case EMode.shiftpressed:
                    OpConstant( EConstant.mu0 );
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    break;
                case EMode.modepressed:
                case EMode.numberentry:
                    if( state.last_button == EButton.divide && state.previous_op == EOp.display  )
                    {
                      if( state.k )
                      {
                        state.k = false;
                      }
                      else
                      {
                        k.CopyFrom( accumulator );
                        kop = EOp.divide;
                        state.k = true;                      
                      }
                    }
                    else
                    {
                      Arithmetic( EOp.divide );
                    }
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none; // So that next number entered will put x<-a and clear display.
                    break;
            }
            break;
        case EButton.equals:
            switch( state.mode )
            {
                case EMode.shiftpressed:
                    // TODO : Percent
                    alert( 'Feature not yet implemented.' );
                    break;
                case EMode.modepressed:
                case EMode.numberentry:
                    state.mode = EMode.numberentry;
                    state.target = ETarget.none;
                    Arithmetic( EOp.display );
                    x.Clear(); // So that pressing 2 + 3 = + = doesn't produce 8
                    break;
            }
            break;
    }

    state.Report();
    accumulator.Report();
    x.Report();
    y.Report();

    state.last_button = button_id;
    Update( state.update_time );
}

function Update( t )
{
    if( t > 0 )
    {
        BlankDisplay();
      state.update_id = setTimeout( DrawDisplay, t );
  }
  else
  {
        DrawDisplay();
    }
}

