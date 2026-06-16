import asyncio
async def worker(name, fail=False):
    await asyncio.sleep(1)
    if fail:
        raise Exception(f"{name} failed")
    return f"{name} completed"
async def main():
    try:
        results = await asyncio.gather(
            worker("Task1"),
            worker("Task2"),
            worker("Task3", fail=True),
            worker("Task4")
        )
        print("All tasks passed")
        print(results)
    except Exception as e:
        print("All tasks failed")
        print("Reason:", e)

asyncio.run(main())