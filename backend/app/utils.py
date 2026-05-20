from fastapi import Request


def client_ip(request: Request) -> str | None:
    """Best-effort client IP — honors X-Forwarded-For for proxied setups."""
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else None
