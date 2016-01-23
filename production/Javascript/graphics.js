// graphics.js

function BlankDisplay()
{
    for( var i=9; i>=0; --i )
    {
        DrawGlyph(EGlyph.blank, i );
    }

    DrawExpMinus( false );
    DrawExpGlyph( EGlyph.blank, 'a' );
    DrawExpGlyph( EGlyph.blank, 'b' );

    DrawPoint( -1 );
    DrawShift( false );
    DrawMinus( -1 );

//    DrawAngle( EAngle.none );
//    DrawBase( 0 );
//    DrawSD( false );
//    DrawM( false );
//    DrawK( false );
}

function DrawDisplay()
{
    for( var i=9; i>=0; --i )
    {
      //  alert('DrawGlyph '+accumulator.display[i]+' at ' +i );

        DrawGlyph( accumulator.display[i], i );
    }

    DrawExpMinus( accumulator.minus_exp );
    DrawExpGlyph( accumulator.exp[0], 'a' );
    DrawExpGlyph( accumulator.exp[1], 'b' );

    DrawPoint( accumulator.point_pos==-1?0:accumulator.point_pos );
    DrawShift( state.mode == EMode.shiftpressed );
    DrawMinus( accumulator.minus_pos );

    DrawAngle( state.base==10?state.angle:EAngle.none );
    DrawBase( state.base );
    DrawSD( state.sd );
 //   DrawM( !memory.IsZero() );
    DrawK( state.k );
}

function ShowImage( image_name, show )
{
    if( show )
    {
        document.images[image_name].style.visibility="visible";
    }
    else
    {
        document.images[image_name].style.visibility="hidden";
    }
}

function DrawAngle( angle )
{
    ShowImage( 'deg', angle == EAngle.deg );
    ShowImage( 'rad', angle == EAngle.rad );
    ShowImage( 'gra', angle == EAngle.gra );
}

function DrawBase( base )
{
    ShowImage( 'oct', base == 8 );
    ShowImage( 'hex', base == 16 );
    ShowImage( 'bin', base == 2 );
}

function DrawSD( sd_on )
{
    ShowImage( 'sd', sd_on );
}

function DrawM( mem )
{
    ShowImage( 'm', mem != 0 );
}

function DrawK( k_on )
{
    ShowImage( 'k', k_on != 0 );
}

function DrawExpMinus( minus_on )
{
    ShowImage( 'lcdc3', minus_on );
}

function DrawMinus( minus_pos )
{
    if( minus_pos == -1 )
    {
        ShowImage( 'lcd103', false );
        // Others clear with digits
    }
    else
    {
        ShowImage( 'lcd'+minus_pos+'3', true );
    }
}

function DrawPoint( point_pos )
{
    for( var i=0; i<10; ++i )
    {
        ShowImage( 'lcd'+i+'p', point_pos == i );
    }
}

function DrawShift( shift_on )
{
    ShowImage( 's', shift_on );
}


function DrawGlyph(d, p)
{
    for( var seg=0; seg<7; ++seg )
    {
    //alert('seg_decoder[' + d + '][' + seg + '] = ' + seg_decoder[d][seg] );
        ShowImage( 'lcd'+p+seg, seg_decoder[d][seg] == 1 );
    }
}

function DrawExpGlyph(d, p)
{
    for( var seg=0; seg<7; ++seg )
    {
        ShowImage( 'lcd'+p+seg, seg_decoder[d][seg] == 1 );
    }
}

