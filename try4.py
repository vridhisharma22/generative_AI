from asyncio import sleep,create_task,run

async def worker():
    print("start")
    await sleep(1)
    print("end")

async def main():
    task=create_task(worker())
    print("let's begin!")
    await task

run(main())