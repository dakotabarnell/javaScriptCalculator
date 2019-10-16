$(document).ready(function() {

  var entry = '';
  var ans = '';
  var current = '';
  var log = '';
  var decimal = true;
  var reset = '';

  // ROUND IF DECIMAL
  function round(val) {
    val = val.toString().split('');
    if (val.indexOf('.') !== -1) {
      var valTest = val.slice(val.indexOf('.') + 1, val.length);
      val = val.slice(0, val.indexOf('.') + 1);
      var i = 0;
      while (valTest[i] < 1) {
        i++
      }
      valTest = valTest.join('').slice(0, i + 2);
      if (valTest[valTest.length-1] === '0') {
        valTest = valTest.slice(0, -1);
      }
      return val.join('') + valTest;
    } else {
      return val.join('');
    }
  }

  $('button').click(function() {

    entry = $(this).attr("value");
    console.log('entry: ' + entry);

    //RESET FOR LOG AFTER ANSWER TO EQUATION.
    if (reset) {
      if (entry === '/' || entry === '*' || entry === '-' || entry === '+') {
        log = ans;
      } else {
        ans = '';
      }
    }
    reset = false;

    // AC OR CE
    if (entry === 'ac' || entry === 'ce' && current === 'noChange') {
      ans = '';
      current = '';
      entry = '';
      log = '';
      $('#history').html('0');
      $('#answer').html('0');
      decimal = true;
    } else if (entry === 'ce') {
      $('#history').html(log.slice(0, -current.length));
      log = log.slice(0, -current.length);
      ans = ans.slice(0, -current.length);
      current = ans;
      if (log.length === 0 || log === ' ') {
        $('#history').html('0');
      }
      $('#answer').html('0');
      entry = '';
      decimal = true;
    }

    // ONLY ONE DECIMAL
    if (entry === '.' || entry === '0.') {
      if (!decimal) {
        entry = '';
      }
    }

    // IMPROPER FIRST DIGIT
    if (ans.length === 0 && isNaN(entry) && entry !== '.' || ans.length === 0 && entry === '0') {
      entry = '';
      ans = '';
    }

    // NO EXTRA OPERATORS
    if (current !== 'noChange') {
      if (current === '' && isNaN(entry) && entry !== '.' || isNaN(current) && isNaN(entry) && entry !== '.') {
        entry = '';
      }
    }

    // DIGIT COMBINING
    while (Number(entry) || entry === '0' || current === '.') {

      if (isNaN(current) && entry === '0' && current !== '.') {
        entry = '';
      } else if (isNaN(current) && Number(entry) && current !== '.') {
        current = '';
      }
      if (entry === '.') {
        decimal = false;
      }
      if (current === '0.' && isNaN(entry)) {
        entry = '';
      } else {
        if (current[current.length - 1] === '.') {
          current = current.concat(entry);
        } else {
          current += entry;
        }
        ans += entry;
        $('#answer').html(current);
        log += entry;
        $('#history').html(log);
        entry = '';
      }
    }

    // OPERATION LIST

    if (entry === '.') {
      if (current === '' || isNaN(current[current.length - 1])) {
        current = '0.';
        ans += entry;
        $('#answer').html('0.');
        log += current;
        $('#history').html(log);

      } else {
        current = current.concat('.');
        ans = ans.concat('.');
        log = ans;
        $('#history').html(ans);
        $('#answer').html(current);
      }
      entry = '';
      decimal = false;

    } else if (entry === '/') {
      current = '/';
      ans = round(eval(ans)) + current;
      log += current;
      $('#history').html(log);
      $('#answer').html('/');
      entry = '';
      decimal = true;

    } else if (entry === '*') {
      current = '*';
      ans = round(eval(ans)) + current;
      log += 'x';
      $('#history').html(log);
      $('#answer').html('x');
      entry = '';
      decimal = true;

    } else if (entry === '-') {
      current = '-';
      ans = round(eval(ans)) + current;
      log += current;
      $('#history').html(log);
      $('#answer').html('-');
      entry = '';
      decimal = true;

    } else if (entry === '+') {
      current = '+';
      ans = round(eval(ans)) + current;
      log += current;
      $('#history').html(log);
      $('#answer').html('+');
      entry = '';
      decimal = true;

    } else if (entry === '=') {
      if (current[current.length - 1] === '.') {
        entry = '';
      } else {
        current = eval(ans).toString();
        $('#answer').html(round(eval(ans)));
        ans = round(eval(ans));
        log += entry + ans;
        $('#history').html(log);
        log = ans;
        entry = '';
        reset = true;
        decimal = true;
      }
      current = 'noChange';
    }
    entry = '';

    if (reset) {
      log = '';
    }

    // MAX DIGITS
    if ($('#entry').children().text().length > 8 || $('#history').text().length > 22) {
      $('#answer').html('0');
      $('#history').html('Digit Limit Met');
      current = '';
      ans = '';
      log = '';
      decimal = true;
    }

    console.log('decimal: ' + decimal);
    console.log('current: ' + current);
    console.log('answer: ' + ans);
    console.log($('#history').text().length);
  });
}); 