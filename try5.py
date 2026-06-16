from asyncio import run,sleep
message = "Continue ...."
async def task1():
        await sleep(3)
        print(message)
        return 'test1'

async def task2(test):
        await sleep(3)
        print(message)
        return test+ ' ' + 'test2'

async def task3(test):
        await sleep(3)
        print(message)
        return test+ ' ' + 'test3'

async def main():
    result1=await task1()
    result2=await task2(result1)
    result3=await task3(result2)
    print(result3)

run(main())
print("Tasks Completed!!!")