from asyncio import run,sleep,create_task

async def foo():
    print('hi')
    await sleep(0)
    print('how are you?')

async def main():
    task=create_task(foo())
    print('Its good to see you!!')
    await task
    print('Have a nice day!!')

run(main())