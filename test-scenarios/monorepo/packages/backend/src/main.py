"""
MONO-001: Backend Python package main module
"""

from dataclasses import dataclass
from typing import Dict, Any


@dataclass
class BackendConfig:
    """Configuration for the backend service."""

    database_url: str
    port: int
    debug: bool = False


def init_backend(config: BackendConfig) -> None:
    """Initialize the backend service."""
    print(f"Initializing backend on port {config.port}")
    print(f"Database: {config.database_url}")
    print(f"Debug mode: {config.debug}")


def handle_request(method: str, path: str, body: Dict[str, Any]) -> Dict[str, Any]:
    """Handle an incoming request."""
    return {
        "status": "ok",
        "method": method,
        "path": path,
        "received": body,
    }
