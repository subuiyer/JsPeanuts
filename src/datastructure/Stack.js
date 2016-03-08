
Stack.prototype = new List();
Stack.prototype.constructor = Stack;
function Stack(){
    this.items = [];
}


Stack.prototype.push = function(item){
    List.prototype.add.call(this, item);
};


Stack.prototype.peek = function(){
    if(this.items.length === 0)
    {
        throw new Error("EmptyStackException");
    }

    return List.prototype.get.call(this, this.items.length - 1);
};


Stack.prototype.pop = function(){
    if(this.items.length === 0)
    {
        throw new Error("EmptyStackException");
    }

    var lastItem = this.items[this.items.length - 1];
    // remove the last item
    List.prototype.remove.call(this, this.items.length - 1);

    return lastItem;
};