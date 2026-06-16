import asyncio
async def task1():
    await asyncio.sleep(1)
    print("Task 1 completed")
async def task2():
    await asyncio.sleep(1)
    print("Task 2 completed")
async def task3():
    await asyncio.sleep(1)
    raise Exception("Task 3 failed")
async def task4():
    await asyncio.sleep(1)
    print("Task 4 completed")
async def main():
    try:
        await asyncio.gather(
            task1(),
            task2(),
            task3(),
            task4()
        )
    except Exception as e:
        print("Error:", e)
asyncio.run(main())