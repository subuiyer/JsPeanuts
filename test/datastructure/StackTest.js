

test('Stack.size()', function(){
    var myStack = new Stack();
    myStack.push('abc');
    myStack.push('def');
    myStack.push('ghi');
    
    ok(3 === myStack.size(), 'Stack size is as expected');
});

test('Stack.size() in empty stack', function(){
    var myStack = new Stack();
    
    ok(0 === myStack.size(), 'Stack size is as expected');
});

test('Stack.peek()', function(){
    var myStack = new Stack();
    myStack.push('abc');
    myStack.push('def');
    myStack.push('ghi');
    
    ok('ghi' === myStack.peek(), 'Stack.peek returns the last item in the stack');
});

test("Stack.peek() in empty stack", function(){
    raises(function(){
        var myStack = new Stack();
        myStack.peek();
    }, 
    Error, "EmptyStackException");
});

test('Stack.peek() does not remove the item from the stack', function() {
    var myStack = new Stack();
    myStack.push('abc');
    myStack.push('def');
    myStack.push('ghi');
    var peekVal1 = myStack.peek();
    var peekVal2 = myStack.peek();
    
    ok('ghi' === peekVal1, 'Stack.peek returns the last item in the stack');
    ok('ghi' === peekVal2, 'Stack.peek returns the last item in the stack');
    ok(3 === myStack.size(), 'Stack.peek does not remove items from the stack');
});

test('Stack.pop() removes the last item from the stack', function() {
    var myStack = new Stack();
    myStack.push('abc');
    myStack.push('def');
    myStack.push('ghi');
    
    ok('ghi' === myStack.pop(), 'Stack.pop returns the last item from the stack');
    ok(2 === myStack.size(), 'Stack.pop removes the last item from the stack');  
});

test("Stack.pop() in empty stack", function(){
    raises(function(){
        var myStack = new Stack();
        myStack.pop();
    }, 
    Error, "EmptyStackException");
});




