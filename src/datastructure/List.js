function List()
{
    this.items = [];
}


List.prototype.add = function(item){
    this.items.push(item);
};


List.prototype.get = function(index){
    if(index < 0 || index > this.items.length - 1)
    {
        throw new Error("InvalidIndexException");
    }
    
    return this.items[index];
};


List.prototype.remove = function(index){
    if(index < 0 || index > this.items.length - 1)
    {
        throw new Error("InvalidIndexException");
    }
    
    this.items.splice(index, 1);
};


List.prototype.size = function(){
    return this.items.length;
};


    

