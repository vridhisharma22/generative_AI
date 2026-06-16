from asyncio import run,sleep

async def task1():
    await sleep(2)
    print("task1")

async def task2():
    await task1()
    print("task2")
    await sleep(2)


async def task3():
    await task2()
    print("task3")


run(task3())
print("Tasks Completed!!!")