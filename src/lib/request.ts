export const request = async <T>(endpoint: string, opts: RequestInit) => {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${endpoint}`, {
      ...opts,
      headers: {
        ...opts.headers,
        "Content-Type": "application/json",
      },
    })
  
    if (request.ok) {
      return request.json() as T;
    } else {
      throw new Error(":(")
    }
  }