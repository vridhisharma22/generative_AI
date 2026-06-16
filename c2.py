import asyncio

async def check_server(server, online=True):
    await asyncio.sleep(1)
    if not online:
        raise Exception(f"ofline")
    return f"{server} is online"
async def main():
    results = await asyncio.gather(
        check_server("A"),
        check_server("B", online=False),
        check_server("C"),
        check_server("D", online=False),
        return_exceptions=True
    )
    success = 0
    failure = 0
    for result in results:
        if isinstance(result, Exception):
            failure=failure+1
            print("Error:", result)
        else:
            success=success+1
            print("Success:", result)
    print("Final Results:")
    print("Success:", success)
    print("Failure:", failure)

asyncio.run(main())