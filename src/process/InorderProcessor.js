var InorderProcessor = function()
{

};


InorderProcessor.tasks = null;
InorderProcessor.taskArguments = null;
InorderProcessor.numTasksDone = 0;


InorderProcessor.init = function(tasks, taskArguments)
{
    InorderProcessor.tasks = tasks;
    InorderProcessor.taskArguments = taskArguments;
    InorderProcessor.numTasksDone = 0;
};


InorderProcessor.process = function()
{
    InorderProcessor.executeTasks();
};


InorderProcessor.executeTasks = function()
{
    var functionName = null;
    var argumentValue = null;
    if(InorderProcessor.numTasksDone < InorderProcessor.tasks.length)
    {
        functionName = InorderProcessor.tasks[InorderProcessor.numTasksDone];
        argumentValue = InorderProcessor.taskArguments[InorderProcessor.numTasksDone];
        InorderProcessor.numTasksDone++;

        functionName(argumentValue, InorderProcessor.executeTasks);
    }
};
