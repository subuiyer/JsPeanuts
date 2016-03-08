function Analyzer()
{
    this.text = '';
    this.textArray = [];
    this.analysis = {};
}

Analyzer.DELIMITER = /!| |,|;/;
Analyzer.DELIMITER_DATE = '/';
Analyzer.DATES = 'dates';
Analyzer.PRICE = 'price';
Analyzer.stopWords = [
    'a', 'an', 'and', 'are', 'as', 'at', 
    'be', 'by', 'for', 'from', 'has', 'he',
    'in', 'is', 'it', 'its', 'of', 'on', 
    'that', 'the', 'to', 'was', 'were', 'will', 'with'
];
Analyzer.currencyCodes = [
    '$', 'USD'
];


Analyzer.prototype.setText = function(text){
    this.text = text;
};


Analyzer.prototype.getText = function(){
    return this.text;
};


Analyzer.prototype.getTextArray = function(){
    return this.textArray;
};


Analyzer.prototype.appendText = function(text){
    this.text += text;
};


Analyzer.prototype.toLower = function(){
    this.text = this.text.toLowerCase();
};


Analyzer.prototype.tokenize = function(){
    this.textArray = this.text.split(Analyzer.DELIMITER);
};


Analyzer.prototype.removeStopWords = function(){
    var i = 0;
    while(i < this.textArray.length)
    {
        if(this.isStopWord(this.textArray[i]))
        {
            this.textArray.splice(i, 1);
        }
        
        i++;
    }
};


Analyzer.prototype.isStopWord = function(word){
    if(word === null || word.length <= 0)
    {
        return false;
    }
     return Analyzer.stopWords.indexOf(word) >= 0;
};


Analyzer.prototype.analyze = function(){
    if(this.text === null)
    {
        return null;
    }
    
    this.toLower();
    this.tokenize();
    this.removeStopWords();
    
    for(var i = 0; i < this.textArray.length; i++)
    {     
        if(this.isDate(this.textArray[i]) === true)
        {    
            this.addDateToAnalysis(this.textArray[i]);
        }
        else if(this.isCurrencyCode(this.textArray[i].substring(0, 1)) && 
                this.isNumber(this.textArray[i].substring(1)))
        {
            // for patterns $9.99
            this.addPriceToAnalysis(this.textArray[i].substring(0, 1), this.textArray[i].substring(1));
        }
        else if(this.isCurrencyCode(this.textArray[i]) && 
                this.isNumber(this.textArray[i + 1]))
        {
            // for patterns $ 9.99
            this.addPriceToAnalysis(this.textArray[i], this.textArray[i+1]);
        }
    }
    
    return this.analysis;
};


Analyzer.prototype.addDateToAnalysis = function(date){
    if(this.analysis.hasOwnProperty(Analyzer.DATES) === false)
    {
        this.analysis[Analyzer.DATES] = [];
    }
    
    this.analysis[Analyzer.DATES].push(date);
};


Analyzer.prototype.addPriceToAnalysis = function(currencyCode, amount){
    if(this.analysis.hasOwnProperty(Analyzer.PRICE) === false)
    {
        this.analysis[Analyzer.PRICE] = [];
    }
    
    this.analysis[Analyzer.PRICE].push({currencyCode: currencyCode, amount: parseFloat(amount) * 100});
};


Analyzer.prototype.isDate = function(word){
    if(word === null)
    {
        return false;
    }
    
    return (word.indexOf(Analyzer.DELIMITER_DATE) > -1) ? true : false;
};


Analyzer.prototype.isNumber = function(word){
    if(word === null)
    {
        return false;
    }
    
    return isNaN(parseFloat(word)) ? false : true;
};


Analyzer.prototype.getNumberValue = function(word){
    if(word === null)
    {
        return false;
    }
    
    return parseFloat(word);
};


Analyzer.prototype.isCurrencyCode = function(word){
    if(word === null)
    {
        return false;
    }
    
    for(var i = 0; i < Analyzer.currencyCodes.length; i++)
    {
        if(word === Analyzer.currencyCodes[i])
        {
            return true;
        }
    }
    
    return false;
};


Analyzer.prototype.removeTrailingString = function(word, trailingString){
    if(word === null || trailingString === null)
    {
        return word;
    }
    
    var lengthToRemove = trailingString.length;
    var wordEnd = word.substring(word.length - lengthToRemove);
    
    while(wordEnd === trailingString)
    {
        word = word.substring(0, word.length - lengthToRemove);
        wordEnd = word.substring(word.length - lengthToRemove);
    }

    return word;
};


