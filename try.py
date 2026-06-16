import asyncio
async def fn():
    await asyncio.sleep(1)
    print("hi")
    await asyncio.sleep(3)
    print("bye")
async def main():
    await asyncio.sleep(1)
    print("Hello, World!")
    task = asyncio.create_task(fn())
    await asyncio.sleep(5)
    print("Goodbye, World!")

asyncio.run(main())
