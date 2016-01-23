// register.js

function Register( name )
{
    // The display is the source of all numbers in any operation, rather than the other way around.
    // So when an operation is performed, the display is "scraped" for the number to use. This is
    // to ensure that operations are performed on what the user sees, not on some internal floating
    // point representation which may not be displayable. Also since display refreshes are more
    // frequent than calculations, this reduces the amount of processing that must be done.
    this.name = name;
    this.display=[EGlyph.zero,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank];
    this.exp=[EGlyph.blank,EGlyph.blank];
    this.point_pos=-1;
    this.minus_pos=-1;
    this.glyph_count=0;
    this.minus_exp=false;
}

Register.prototype.CopyFrom = function( other )
{
    for( var i = 0; i<10; ++i )
    {
        this.display[i] = other.display[i];
    }
    this.exp[0] = other.exp[0];
    this.exp[1] = other.exp[1];
    this.point_pos = other.point_pos;
    this.minus_pos = other.minus_pos;
    this.glyph_count = other.glyph_count;
    this.minus_exp = other.minus_exp;
}

Register.prototype.Swap = function( other )
{
    var tmp_display = new Array();
    for( var i = 0; i<10; ++i )
    {
        tmp_display[i] = other.display[i];
    }
    var tmp_exp = new Array();
    tmp_exp[0] = other.exp[0];
    tmp_exp[1] = other.exp[1];
    var tmp_point_pos = other.point_pos;
    var tmp_minus_pos = other.minus_pos;
    var tmp_glyph_count = other.glyph_count;
    var tmp_minus_exp = other.minus_exp;
    
    for( var i = 0; i<10; ++i )
    {
        other.display[i] = this.display[i];
    }
    other.exp[0] = this.exp[0];
    other.exp[1] = this.exp[1];
    other.point_pos = this.point_pos;
    other.minus_pos = this.minus_pos;
    other.glyph_count = this.glyph_count;
    other.minus_exp = this.minus_exp;    
    
    for( var i = 0; i<10; ++i )
    {
        this.display[i] = tmp_display[i];
    }
    this.exp[0] = tmp_exp[0];
    this.exp[1] = tmp_exp[1];
    this.point_pos = tmp_point_pos;
    this.minus_pos = tmp_minus_pos;
    this.glyph_count = tmp_glyph_count;
    this.minus_exp = tmp_minus_exp;    
}

Register.prototype.SetExp = function( exp, minus_exp )
{
    this.exp = exp;
    this.minus_exp = minus_exp;
}

Register.prototype.Set = function( glyph_count, display, exp, point_pos, minus_pos, minus_exp )
{
    this.glyph_count = glyph_count;
    this.display = display;
    this.point_pos = point_pos;
    this.minus_pos = minus_pos;
    this.SetExp( exp, minus_exp );
}

Register.prototype.SetOverflow = function()
{
    this.display = [EGlyph.minus,EGlyph.error,EGlyph.minus,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank];
    this.exp = [EGlyph.blank,EGlyph.blank];
    this.point_pos = -2; //minus two means don't display at all. minus one just means display at default position.
    this.minus_pos = -1;
    this.minus_exp = false;
    this.glyph_count = 0;
    state.mode = EMode.error;
}

Register.prototype.Clear = function()
{
    this.display = [EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank,EGlyph.blank];
    this.exp = [EGlyph.blank,EGlyph.blank];
    this.point_pos = -1;
    this.minus_pos = -1;
    this.minus_exp = false;
    this.glyph_count = 0;
}

// Always returns an integer. Positive or negative.
Register.prototype.GetMantissa = function()
{
}

// Returns an integer. Positive or negative. Includes point_pos.
Register.prototype.GetExponent = function()
{
}

// Returns contents of register as a string suitable for JavaScript eval.
Register.prototype.toString = function()
{
    this.Report();

    var s = '';
    if( this.minus_pos >= 0 )
    {
        s += '-';
    }
    for( var i = 9; i>=0; i-- )
    {
        var g = this.display[i];
        if( g < 10 )
        {
            s += g;
        }
        if( i == this.point_pos )
        {
            s += '.';
        }
    }
    if( this.exp[0] != 10 || this.exp[1] != 10 )
    {
        s += 'E';
    }
    if( this.minus_exp )
    {
        s += '-';
    }
    for( var i = 1; i>=0; --i )
    {
        var g = this.exp[i];
        if( g < 10 )
        {
            s += g;
        }
    }
    return s;
}

// Converts a javascript float into a display
Register.prototype.SetValue = function( mantissa )
{
//Report( 'SetValue('+mantissa+')' );

// FIX N mode means always N decimal places, including trailing zeroes
// so for N=6, 0 is 0.000000
// sh 1 299792458 is 299792458.0
// sh 4 1.6021892e-19 is 0.000000
// it also rounds last decimal digit
// ENG buttons override FIX

// SCI N mode means always N  digits, including trailing zeroes. Includes exp.
// so for N=3, 0 is 0.00E00
// sh 1 299792458 is 3.00E08
// sh 4 1.6021892e-19 is 1.60E-19
// it also rounds
// ENG buttons override SCI
    if( isFinite( mantissa ) )
    {
      var precision = 10;
      if( Math.abs( mantissa ) < 1 )
      {
        precision--; // So that 0.3333333333 leaves room for leading 0.
      }
      var s_value = mantissa.toPrecision( precision );
//Report( 's_value='+s_value );

      var e_sign = 1;
      var e_array = new Array();
      var n_array = new Array();
      var n_sign = 1;
      var point_pos = -1;

      var e_pos = s_value.indexOf( 'e' );
      var n_pos = s_value.length-1;

      if( e_pos >= 0 )
      {
          n_pos = e_pos-1;
          e_pos++;

          if( s_value.length > e_pos )
          {
              var c = s_value.charAt( e_pos );

              if( c == '-' )
              {
                  e_sign = -1;
                  e_pos++;
              }
              else if ( c == '+' )
              {
                  e_sign = +1;
                  e_pos++;
              }
          }

          var e_num = 0;
          while( s_value.length > e_pos )
          {
              if( e_num >= 2 )
              {
                  this.SetOverflow();
                  return;
              }

              e_array.unshift( s_value.charAt( e_pos ) );
              e_pos++;
              e_num++;
          }
      }

      var j = 0;
      var trailing_zeroes = 1;
      Report( "n_pos="+n_pos );
      while( n_pos >= 0 )
      {
          var c = s_value.charAt( n_pos );
//Report( "c="+c+" n_pos="+n_pos+" trailing_zeroes="+trailing_zeroes );
          if( c == '-' )
          {
              n_sign = -1;
          }
          else if( c == '.' )
          {
              point_pos = n_pos;
              trailing_zeroes = 0;
          }
          else
          {
              if( c != '0' )
              {
                  trailing_zeroes = 0;
              }
              if( !trailing_zeroes )
              {
//Report( "push c="+c );
                  n_array.push( c );
              }
          }
          n_pos--;
      }
      if( n_sign < 0 )
      {
//Report( 'adjust point_pos ' + point_pos );
          point_pos--; // don't include space taken up by '-' character
      }

//Report( 'n_sign = ' + n_sign + ', n_array=' + n_array );
//Report( 'point_pos = ' + point_pos );
//Report( 'e_sign = ' + e_sign + ', e_array=' + e_array );

      var j = 0;
      while( (c = n_array.shift()) != null )
      {
          this.display[j++] = c;
      }
      if( point_pos < 0 )
      {
          this.point_pos = -1;
      }
      else
      {
          this.point_pos = j-point_pos;
      }
      Report( 'j='+j+' this.point_pos = ' + this.point_pos );
      this.minus_pos = n_sign<0?j:-1;
      while( j<10 )
      {
          this.display[j++] = EGlyph.blank;
      }


      var j = 0;
      while( (c = e_array.shift()) != null )
      {
          this.exp[j++] = c;
      }
      while( j<2 )
      {
          this.exp[j++] = EGlyph.blank;
      }
      this.minus_exp = e_sign<0?true:false;

  //    Report( 'Copying to real display. i=' +i + ' point_pos=' + point_pos );
      // Copy display workspace to real display
      /*

      for( var digit in frac_display )
      {
          this.display[j++] = frac_display[digit];
      }
      this.point_pos = j;
      for( var digit in int_display )
      {
          this.display[j++] = int_display[digit];
      }


  //    Report( 'Adding sign ' + sign + ' at ' + j );
      if( sign < 0 )
      {
  //    Report( 'Added sign at ' + j );
          this.minus_pos = j;
      }
      else
      {
          this.minus_pos = -1;
      }
      while( j < 10 )
      {
  //    Report( 'Adding blank at ' + j );
          this.display[j++] = EGlyph.blank;
      }

      // To do: exp displayment
      this.exp=[EGlyph.blank,EGlyph.blank];
      this.minus_exp=false;*/
    }
    else
    {
      Report( 'NaN' );
      // Infinity, Not a Number
      this.SetOverflow();
    }

}

// Dump contents of register for debugging. Includes formatting spaces.
Register.prototype.Report = function()
{
    var s = this.name + '=';
    if( this.minus_pos >= 0 )
    {
        s += '-';
    }
    else
    {
        s += ' ';
    }
    for( var i = 9; i>=0; i-- )
    {

        var g = this.display[i];
        if( g == 10 )
        {
            s += ' ';
        }
        else if( g < 10 )
        {
            s += g;
        }
        else
        {
            s += '@';
        }
        if( i == this.point_pos )
        {
            s += '.';
        }
    }
    if( this.exp[0] == 10 && this.exp[1] == 10 )
    {
        s += ' ';
    }
    else
    {
        s += 'E';
    }
    if( this.minus_exp )
    {
        s += '-';
    }
    else
    {
        s += ' ';
    }
    for( var i = 1; i>=0; --i )
    {
        var g = this.exp[i];
        if( g == 10 )
        {
            s += ' ';
        }
        else if( g < 10 )
        {
            s += g;
        }
        else
        {
            s += '@';
        }
    }
    Report( s );
}

// this re-displays the accumulator, evaluating exponents, using the
// current display mode, in the current base, removes trailing zeroes.
Register.prototype.Level = function()
{
    var s = this.toString();
    this.SetValue( eval(s) );
}

// Performs : this <- op( x, this )
Register.prototype.Evaluate = function( x, op )
{
    state.update_time = 200;

    Report( 'Evaluate ' + this.name + ' op = ' + op );
    switch( op )
    {
        case EOp.add:
            var x_str = x.toString();
            var a_str = this.toString();
            var result = eval( "(" + x_str + ")+(" + a_str + ")" );
            Report( 'Evaluate result = ' + result + ' = ' + x_str + ' + ' + a_str );
            this.SetValue( result );
//            this.Report();
//            x.Clear(); // So that pressing 2 + 3 = + = doesn't produce 8
            break;
        case EOp.subtract:
            var x_str = x.toString();
            var a_str = this.toString();
            var result = eval( "(" + x_str + ")-(" + a_str + ")" );
            Report( 'Evaluate result = ' + result + ' = ' + x_str + ' - ' + a_str );
            this.SetValue( result );
//            this.Report();
//            x.Clear(); // So that pressing 2 + 3 = + = doesn't produce 8
            break;
        case EOp.multiply:
            var x_str = x.toString();
            var a_str = this.toString();
            var result = eval( "(" + x_str + ")*(" + a_str + ")" );
            Report( 'Evaluate result = ' + result + ' = ' + x_str + ' x ' + a_str );
            this.SetValue( result );
//            this.Report();
//            x.Clear(); // So that pressing 2 + 3 = + = doesn't produce 8
            break;
        case EOp.divide:
            var x_str = x.toString();
            var a_str = this.toString();
            var result = eval( "(" + x_str + ")/(" + a_str + ")" );
            Report( 'Evaluate result = ' + result + ' = ' + x_str + ' / ' + a_str );
            this.SetValue( result );
//            this.Report();
//            x.Clear(); // So that pressing 2 + 3 = + = doesn't produce 8
            break;
        default:
            this.Level(); // this re-displays the accumulator, evaluating exponents, using the current display mode, in the current base, removes trailing zeroes.
            break;
    }
}

