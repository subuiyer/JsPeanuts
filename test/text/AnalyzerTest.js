
test('Analyzer.setText()', function(){
    var myAnalyzer = new Analyzer();
    ok(0 === myAnalyzer.getText().length, 'Text content is empty before setting it');
    
    myAnalyzer.setText('blah');
    ok(4 === myAnalyzer.getText().length && 'blah' === myAnalyzer.getText(), 'Text content is what was set');
});

test('Analyzer.appendText()', function(){
    var myAnalyzer = new Analyzer();
    myAnalyzer.setText('abc');
    myAnalyzer.appendText('def');

    ok(6 === myAnalyzer.getText().length && 'abcdef' === myAnalyzer.getText(), 'Text was appended to the original text');
});

test('Analyzer.toLower()', function(){
    var myAnalyzer = new Analyzer();
    myAnalyzer.setText('This should BE all Lower Case.');
    myAnalyzer.toLower();    

    ok('this should be all lower case.' === myAnalyzer.getText(), 'toLower converted all text to lower case');
});

test('Analyzer.tokenize()', function(){
    var myAnalyzer = new Analyzer();
    myAnalyzer.setText('This will be tokenized.');
    myAnalyzer.tokenize();    

    ok(4 === myAnalyzer.getTextArray().length, 'Contains the right number of tokens');
});

test('Analyzer.removeStopWords()', function(){
    var myAnalyzer = new Analyzer();
    myAnalyzer.setText('Jack and Jill went up the hill to fetch a pail of water. The pail was big.');
    myAnalyzer.toLower();
    myAnalyzer.tokenize();
    myAnalyzer.removeStopWords();    

    ok(10 === myAnalyzer.getTextArray().length, 'All stop words removed');
});

test('Analyzer.analyze() - Look for dates', function(){
    var myAnalyzer = new Analyzer();
    myAnalyzer.setText('Today is 02/19/2016.');
    var analysis = myAnalyzer.analyze();
     
    ok(1 === Object.keys(analysis).length, '1 item in the analysis result');    
    ok(1 === analysis[Analyzer.DATES].length, 'Analysis contains 1 date');
});

test('Analyzer.analyze() - Look for dates', function(){
    var myAnalyzer = new Analyzer();
    myAnalyzer.setText('Today is 02/19/2016. Yesterday was 02/18/2016');
    var analysis = myAnalyzer.analyze();
     
    ok(1 === Object.keys(analysis).length, '1 items in the analysis result');
    ok(true === analysis.hasOwnProperty(Analyzer.DATES), 'Analysis contains Dates');
    ok(2 === analysis[Analyzer.DATES].length, 'Analysis contains 2 dates');
});

test('Analyzer.() - Is it a number?', function(){
    var myAnalyzer = new Analyzer();
    
    ok(true === myAnalyzer.isNumber('10'), 'Yes, 10 is a number');
    ok(true === myAnalyzer.isNumber('10.0'), 'Yes, 10.0 is a number');
    ok(true === myAnalyzer.isNumber('0'), 'Yes, 0 is a number');
    ok(true === myAnalyzer.isNumber('-1'), 'Yes, -1 is a number');
    ok(true === myAnalyzer.isNumber('-1.023'), 'Yes, -1.023 is a number');
    ok(true === myAnalyzer.isNumber(' 10 '), 'Yes, " 10 " is a number');
    ok(true === myAnalyzer.isNumber('10.09.'), 'Yes, 10.09. is a number');
    ok(true === myAnalyzer.isNumber('10.09!'), 'Yes, 10.09! is a number');
    ok(false === myAnalyzer.isNumber('AAA'), 'No, AAA is not a number');
});

test('Analyzer.analyze() - Look for price', function(){
    var myAnalyzer = new Analyzer();
    myAnalyzer.setText('This car costs $1200.00. And insurance costs USD 550,!! Gas is $ 2.09');
    var analysis = myAnalyzer.analyze();
    
alert('STR:' + JSON.stringify(analysis[Analyzer.PRICE]));    
     
    ok(1 === Object.keys(analysis).length, '1 item in the analysis result');    
    ok(3 === analysis[Analyzer.PRICE].length, 'Analysis contains 3 price values');
    ok('$' === analysis[Analyzer.PRICE][0].currencyCode, 'Analysis contains the right currency code of $');
    ok(120000 === analysis[Analyzer.PRICE][0].amount, 'Analysis contains price value of 120000');
    ok('$' === analysis[Analyzer.PRICE][1].currencyCode, 'Analysis contains the right currency code of $');
    ok(55000 === analysis[Analyzer.PRICE][1].amount, 'Analysis contains price value of 55000');
    ok('$' === analysis[Analyzer.PRICE][2].currencyCode, 'Analysis contains the right currency code of $');
    ok(209 === analysis[Analyzer.PRICE][2].amount, 'Analysis contains price value of 209');
});

test('Analyzer.removeTrailingString()', function(){
    var myAnalyzer = new Analyzer();
    
    ok('abcd' === myAnalyzer.removeTrailingString('abcd.', '.'), 'Trailing . was removed.');
    ok('ab.cd' === myAnalyzer.removeTrailingString('ab.cd.', '.'), 'Only trailing . was removed.');
    ok('ab.cd' === myAnalyzer.removeTrailingString('ab.cd.!', '.!'), 'Trailing string was removed.');
    ok('ab.cd' === myAnalyzer.removeTrailingString('ab.cd..', '.'), 'Trailing string was removed recursively.');
    ok('ab.cd' === myAnalyzer.removeTrailingString('ab.cd.!.!', '.!'), 'Trailing string was removed recursively.');
    ok('abcd' === myAnalyzer.removeTrailingString('abcd', 'zz'), 'Nothing removed when specified trailing string does not exist.');
    ok('abcd' === myAnalyzer.removeTrailingString('abcd', 'zzxxxxxx'), 'Nothing removed when specified trailing string does not exist.');
});

test('Analyzer.isCurrencyCode()', function(){
    var myAnalyzer = new Analyzer();
    
    ok(true === myAnalyzer.isCurrencyCode('$'), 'Yes, $ is a known currency code');
    ok(true === myAnalyzer.isCurrencyCode('USD'), 'Yes, USD is a known currency code');
    ok(false === myAnalyzer.isCurrencyCode('abc'), 'No, abc is not a known currency code');
});

//test('Analyzer.()', function(){
//    var myAnalyzer = new Analyzer();
//    ok(0 === myAnalyzer.getText().length, '');
//});

